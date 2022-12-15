import React from 'react';
type Props = {
	handleResultsPerPage: (num: number) => void
}

const ResultsCount = ({handleResultsPerPage}: Props ) => {
	return <div>
		<ul className="flex flex-col ">
			<li className="hover:bg-blue-400"><button className="flex justify-start w-full" onClick={() => handleResultsPerPage(10)} >10</button></li>
			<li className="hover:bg-blue-400"><button className="flex justify-start w-full" onClick={() => handleResultsPerPage(20)} >20</button></li>
			<li className="hover:bg-blue-400"><button className="flex justify-start w-full" onClick={() => handleResultsPerPage(30)} >30</button></li>
			<li className="hover:bg-blue-400"><button className="flex justify-start w-full" onClick={() => handleResultsPerPage(40)} >40</button></li>
			<li className="hover:bg-blue-400"><button className="flex justify-start w-full" onClick={() => handleResultsPerPage(50)} >50</button></li>
		</ul>
	</div>;
};

export default ResultsCount;
