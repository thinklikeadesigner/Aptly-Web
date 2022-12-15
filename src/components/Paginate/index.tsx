import React, { useEffect } from 'react';
import left from '../../left-arrow.png';
import right from '../../right-arrow.png';
import DropDownContainer from '../DropDownContainer';
import ResultsCount from '../ResultsCount';


type PaginationProps = {
	checkIfEmpty: () => void;
	propertiesPerPage: number;
	currentPage: number;
	totalProperties: number;
	paginate: (i: number) => void;
}

export const Pagination = ({checkIfEmpty, propertiesPerPage, currentPage, totalProperties, paginate}: PaginationProps) => {
	
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
		pageNumbers.push(i);
        
	}


	useEffect(() => {
		checkIfEmpty();
	}, []);
	
	

	return <section className="py-8">

		<nav className="">
			<div className="flex justify-end">
			</div>
			<ul className="flex items-center justify-center list-none">
				{pageNumbers.map(number => (
					<li key={number} className="px-2">
						{number === currentPage ? <a className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400" onClick={() => paginate(number)} href="!#" >
							{number}
						</a> : 		<a className="px-4 py-2 text-white bg-blue-200 rounded hover:bg-blue-400" onClick={() => paginate(number)} href="!#" >
							{number}
						</a>}
					</li>
				))}
			</ul>

		</nav>
	</section>
	;
};
