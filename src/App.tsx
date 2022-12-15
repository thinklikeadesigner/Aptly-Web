import React, { useState, useEffect } from 'react';
import newData from './newfile.json';
import { PropertyContext } from './context/PropertyContext/index';
import Home from './pages/Home';
import { alphaSort } from './components/helpers/index';
import { IProperty } from './types';

console.log(newData);

function App() {

	

	const [properties, setProperties] = useState<IProperty[]>(() => alphaSort(newData));
	

	return (
		<div className="px-4 lg:container lg:mx-auto">
			<PropertyContext.Provider value={properties}>
				<Home/>
			</PropertyContext.Provider>
		</div>
	);
}

export default App;


