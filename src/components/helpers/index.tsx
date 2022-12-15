import { IAmenityCheckbox, IProperty, IUnit } from '../../types';

export const alphaSort = (data: IProperty[]) => {
	return data.sort((a: IProperty, b: IProperty) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
};



export const getAmenities = (housingdata: IProperty[]) => {
	const amenitiesCheckBoxes: IAmenityCheckbox[] = [];
	const amenitiesSet = new Set(housingdata.map((i: { units: IUnit[]}) => i.units.map(i => i.amenities)).flat().flat());
	amenitiesSet.forEach(item => amenitiesCheckBoxes.push({ name: `${item}`, checked: false }));
	return amenitiesCheckBoxes;
};

export const unitHasAmenities = (amenitiesArray: string[], chosenAmenities: string[]) => chosenAmenities.every((i: string) => amenitiesArray.includes(i));
export const getUnitAmenities = (unit: IUnit) => unit.amenities.map((i) => i);

export const getUnitsByType = (property: IProperty, unitType: string) => {
	return   property.units.map((i) => i).filter((j: { type: string; }) => j.type === unitType);
};

export const noUnitsAvailable = (units: IUnit[]) => Object.keys(units).length === 0;

export const getUnitsMinMax = (units: IUnit[]) => {
	const minOcc = units.map((i: { minOccupancy: number; }) => i.minOccupancy);
	const absMin = Math.min(...minOcc);

	const maxOcc = units.map((i: { maxOccupancy: number; }) => i.maxOccupancy);
	const absMax = Math.max(...maxOcc);

	return [absMin, absMax];
};

export const getOverallMinMax = (housingdata: IProperty[]) => {
	return getUnitsMinMax(housingdata.map((i: { units: IUnit[]; }) => i.units.map(i => i)).flat().flat());
};

export const getAvgSqft = (units: IUnit[]) => {
	const sqftList = units.map((i: { sqft: number; }) => i.sqft);
	return Math.floor(sqftList.reduce((a:number, b:number) => a + b) / sqftList.length);
};

export const unitRange = (unit: IUnit) => {
	return [unit.minOccupancy, unit.maxOccupancy];
};

export const isUnitInRange = (unitRange: number[], range: number[]) => {
	if (range[0] <= unitRange[0] && range[1] >= unitRange[1]) {
		return true;
	}
	return false;
};