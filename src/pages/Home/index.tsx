import React, { useContext, useEffect, useState } from 'react';
import { AmenityMenu } from '../../components/AmenityMenu';
import DropDownContainer from '../../components/DropDownContainer';
import { Pagination } from '../../components/Paginate';
import PropertyList from '../../components/PropertyList';
import SearchBar from '../../components/SearchBar';
import { PropertyContext } from '../../context/PropertyContext/index';
import ResultsCount from '../../components/ResultsCount/index';
import FilterPanel from '../../components/FilterPanel';
import RangeInput from '../../components/RangeInput/index';
import { alphaSort, getAmenities, getOverallMinMax, getUnitAmenities, isUnitInRange, unitHasAmenities, unitRange } from '../../components/helpers';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { IAmenityCheckbox, IProperty, IUnit } from '../../types';




const Home = () => {
	const propertyList = useContext<IProperty[]>(PropertyContext);
	const overAllMin = getOverallMinMax(propertyList)[0];
	const overAllMax = getOverallMinMax(propertyList)[1];
	const [amenities, setAmenities] = useLocalStorage('amenities', getAmenities(propertyList));
	const [properties, setProperties] = useLocalStorage('properties', propertyList); 
	const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);
	const [propertiesPerPage, setPropertiesPerPage] = useLocalStorage('propertiesPerPage', 10);
	const [searchInput, setSearchInput] = useState('');
	const [selectedMin, setSelectedMin] = useLocalStorage('selectedMin', overAllMin);
	const [selectedMax, setSelectedMax] = useLocalStorage('selectedMax', overAllMax);
	const [isResultSelected, setIsResultSelected] = useState(false);
	const [count, setCount] = useLocalStorage('count','none selected');



	const getMin = ((min: number) => {
		setSelectedMin(min);
	});
	const getMax = ((max: number) => {
		setSelectedMax(max);
	});

	const updateCheckStatus = (index: number) => {
		const amenitiesStateList = amenities;
		const changeCheckedAmenities = amenitiesStateList.map((amenity: IAmenityCheckbox, currentIndex: number) => currentIndex === index ? { ...amenity, checked: !amenity.checked } : amenity
		);
		setAmenities(
			changeCheckedAmenities
		);
		const count = changeCheckedAmenities.filter((item:IAmenityCheckbox) => 	item.checked === true);
		if (count.length === 0) {
			setCount('none selected');
		} else {
			setCount(`${count.length} selected`);
		}
		
	};

	
    
	// to calculate which properties go on each page
	const indexOfLastProperty = currentPage * propertiesPerPage;
	const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
	const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

	const checkIfEmpty = () => {
		if (currentProperties.length === 0)
		{
			setCurrentPage(1);
		}
	};


	// for text search
	const handleChangeInput = (_e: { target: { value: string } }) => setSearchInput(_e.target.value);


	// change page
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	// results per page
	const handleResultsPerPage = (num: number) => {
		setPropertiesPerPage(num);   // get current properties
		setIsResultSelected(true);
	};




	const applyFilters = () => {
		

		const unmutatedPropertyList = JSON.stringify(propertyList);
		let updatedPropertyList = JSON.parse(unmutatedPropertyList);
		
		const amenityChecked = amenities.filter((item: IAmenityCheckbox) => item.checked).map((item: IAmenityCheckbox) => item.name.toLowerCase());

		if (amenityChecked.length !== 0) {
			
			const amenityArr: IProperty[] = [];
			updatedPropertyList.reduce((prev: IProperty, current: IProperty) => {
				
				const filteredUnits = current.units.filter((unit: IUnit) => unitHasAmenities(getUnitAmenities(unit), amenityChecked));
				if (filteredUnits.length) {
					
					const filteredProperty = current.units.filter((unit: IUnit) => unitHasAmenities(getUnitAmenities(unit), amenityChecked));
					current.units = filteredProperty;
					amenityArr.push(current);
					
				}
			}, amenityArr);

					
			updatedPropertyList = amenityArr;
		}
		const minRange = selectedMin;
		const maxRange = selectedMax;
		const rangeArr: IProperty[] = [];

		updatedPropertyList.reduce((prev: IProperty, current: IProperty) => {

			const filtered = current.units.filter((unit: IUnit) => isUnitInRange(unitRange(unit), [minRange, maxRange]));
			if (filtered.length) {
				const filteredUnits = current.units.filter((unit: IUnit) => isUnitInRange(unitRange(unit), [minRange, maxRange]));
				current.units = filteredUnits;
				rangeArr.push(current);
			}
		}, rangeArr
		);
		updatedPropertyList = rangeArr;

		if (searchInput) {
			updatedPropertyList = updatedPropertyList.filter(
				(item:IProperty) => item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !== -1
			);
		}

		updatedPropertyList = alphaSort(updatedPropertyList);
		
		setProperties(updatedPropertyList);
	};


	useEffect(() => {
		applyFilters();
		return setIsResultSelected(false);
	}, [amenities, searchInput, selectedMin, selectedMax, isResultSelected, count]);
    

	return <div className="flex flex-col font-body">
		<FilterPanel>
			<SearchBar value={searchInput} changeInput={handleChangeInput} />
			<div className="lg:mr-10"></div>
			<RangeInput getMin={getMin} getMax={getMax} min={overAllMin} max={overAllMax} />
			<div className="lg:mr-10"></div>
			<DropDownContainer count={count} title={'Amenities'} >
				<AmenityMenu amenities={amenities} updateCheckStatus={updateCheckStatus} />
			</DropDownContainer>
			<div className="w-30"></div>
			<DropDownContainer isResultSelected={isResultSelected} title='Results per Page' count={propertiesPerPage} >
				<ResultsCount  handleResultsPerPage={handleResultsPerPage}/>
			</DropDownContainer>
		</FilterPanel>
		<Pagination checkIfEmpty={checkIfEmpty} propertiesPerPage={propertiesPerPage} currentPage={currentPage} totalProperties={properties.length} paginate={paginate}/>
		<PropertyList properties={currentProperties} >
			<Pagination checkIfEmpty={checkIfEmpty} propertiesPerPage={propertiesPerPage} currentPage={currentPage} totalProperties={properties.length} paginate={paginate}/>
		</PropertyList>
	</div>;
};

export default Home;

