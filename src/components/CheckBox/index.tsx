import React from 'react';

type Props = {
    index: number; 
    label: string; 
    isChecked: boolean;
    checkHandler: () => void;
};

const CheckBox = ({ isChecked, label, checkHandler, index }: Props) => {
	return (
		<div className="">
			<input
				className="hover:cursor-pointer"
				type="checkbox"
				id={`checkbox-${index}`}
				checked={isChecked}
				onChange={checkHandler}
			/>
			<label className="ml-2 text-lg hover:cursor-pointer" htmlFor={`checkbox-${index}`}>{label}</label>
		</div>
	);
};

export default CheckBox;
