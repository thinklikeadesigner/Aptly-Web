import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode 
}

const FilterPanel = ({children}: Props) => {
	return <div className="flex-col items-center justify-between w-auto pb-20 lg:flex lg:flex-row ">{children}</div>;
};

export default FilterPanel;
