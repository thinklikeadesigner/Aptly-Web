/* eslint-disable react/jsx-key */
import React, { ReactNode, useState, useEffect, EventHandler, Ref } from 'react';
import './styles.css';
import { useOutsideClick } from '../../hooks/useOutsideClick';

type DropDownProps = {
	children: ReactNode;
	count?: number;
	title: string;
	isResultSelected?: boolean;
}
	
const DropDownContainer = ({ children, count, title, isResultSelected }: DropDownProps) => {
	const [open, setOpen] = useState(false);
	const handleClickOutside = () => {
		setOpen(false);
	};
	
	const ref:React.MutableRefObject<any> = useOutsideClick(handleClickOutside);


	const handleHeaderClick = (event:React.BaseSyntheticEvent) => {
		// do something

		event.stopPropagation();
	};

	const handleOpen = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (isResultSelected) {
			setOpen(false);
		}
	

	}, [isResultSelected]);
	

	return (
		<div ref={ref} onClick={handleHeaderClick} className="relative py-8 text-lg w-fit">
			{/* <button onClick={handleOpen}  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded w-max hover:bg-blue-400"> {`${title}: ${count}`} */}
			<button onClick={handleOpen}  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded w-max hover:bg-blue-400"> {`${title}`}
	
			</button>

			{open && (
				<div className="absolute z-20 w-56 p-0 list-none rounded bg-slate-200">
					{children}
				</div>
			)}
		</div>
	);
};

export default DropDownContainer;