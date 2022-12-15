import React from 'react';
import { IProperty, IUnit } from '../../types';
import { getAvgSqft, getUnitsByType, getUnitsMinMax, noUnitsAvailable } from '../helpers';
import './styles.css';


function UnitList(property: IProperty) {
	const studioArr = getUnitsByType(property, 'studio');
	const oneBdrmArr = getUnitsByType(property, 'oneBdrm');
	const twoBdrmArr = getUnitsByType(property, 'twoBdrm');
	const threeBdrmArr = getUnitsByType(property, 'threeBdrm');
	const fourBdrmArr = getUnitsByType(property, 'fourBdrm');



	function tableRow(unitArr: IUnit[], type: string): React.ReactNode {
		return noUnitsAvailable(unitArr) ? null : <tr className="h-10 even:bg-gray-100 odd:bg-white">
			<td className="font-sans text-sm font-normal leading-5 text-center md:py-2">
				<h4>{type}</h4>
			</td>
			<td className="text-sm font-normal leading-5 text-center md:py-2">  <p>
				{getAvgSqft(unitArr)}
			</p>
			</td>
			<td className="text-sm font-normal leading-5 text-center md:py-2"><p>
				{`${getUnitsMinMax(unitArr)[0]} - ${getUnitsMinMax(unitArr)[1]}`}
			</p>
			</td>
		</tr>;
	}

	return <div className="overflow-x-hidden font-sans ">
		<table className="w-full text-black table-auto" >
			<thead >
				<tr className="h-8 bg-gray-200 mb-9">
					<th className="text-xs font-semibold leading-4 w-28">Unit Type</th>
					<th className="w-48 text-xs font-semibold leading-4">Average Square Footage</th>
					<th className="text-xs font-semibold leading-4 w-44">Range</th>
				</tr>
			</thead>
			<tbody  >
				{tableRow(studioArr, 'Studio')}
				{tableRow(oneBdrmArr, '1 BR')}
				{tableRow(twoBdrmArr, '2 BR')}
				{tableRow(threeBdrmArr, '3 BR')}
				{tableRow(fourBdrmArr, '4 BR')}
			</tbody>
		</table>
	</div>;
}

export default UnitList;
