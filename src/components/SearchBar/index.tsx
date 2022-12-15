import React, { ChangeEventHandler } from 'react';
type Props = {
  value: string;
  changeInput: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = ({ value, changeInput }: Props) => {
	return (
		<div className="flex items-center py-8">
			<input
				className="w-56 text-2xl placeholder-gray-500 border rounded border-slate-300"
				type="text"
				placeholder="Property Name"
				value={value}
				onChange={changeInput}
			/>
		</div>
	);
};

export default SearchBar;
