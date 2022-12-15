import React, {
	ChangeEvent,
	FC,
	useCallback,
	useEffect,
	useState,
	useRef
} from 'react';
import classnames from 'classnames';
import './styles.css';
  
  interface RangeInputProps {
    min: number;
    max: number;
	getMin: (num: number) => void;
	getMax:  (num: number) => void;
  }
  
const RangeInput: FC<RangeInputProps> = ({
	min,
	max,
	getMin,
	getMax
}) => {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef<HTMLInputElement>(null);
	const maxValRef = useRef<HTMLInputElement>(null);
	const range = useRef<HTMLDivElement>(null);
  
	// Convert to percentage
	const getPercent = useCallback(
		(value: number) => Math.round(((value - min) / (max - min)) * 100),
		[min, max]
	);
  
	// Set width of the range to decrease from the left side
	useEffect(() => {
		if (maxValRef.current) {
			const minPercent = getPercent(minVal);
			const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number
  
			if (range.current) {
				range.current.style.left = `${minPercent}%`;
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [minVal, getPercent]);
  
	// Set width of the range to decrease from the right side
	useEffect(() => {
		if (minValRef.current) {
			const minPercent = getPercent(+minValRef.current.value);
			const maxPercent = getPercent(maxVal);
  
			if (range.current) {
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [maxVal, getPercent]);
  
	// Get min and max values when their state changes
	useEffect(() => {
		getMin(minVal);
		getMax(maxVal);
	}, [minVal, maxVal]);
  
	// BUG menu won't close if you click outside the menu beside the button
	// BUG menu button size changes with amenities number
	

	return (
		<>
			<div className="flex items-center justify-start py-8">
				{/* <div className="pr-4"><h1 className="text-lg text-left ">Range:</h1></div> */}
				<p className="pr-2 m-0 text-xs text-center md:pr-8 md:text-lg">min</p>
				<div className="py-8">
					<input
						type="range"
						min={min}
						max={max}
						value={minVal}
						ref={minValRef}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							const value = Math.min(+event.target.value, maxVal - 1);
							setMinVal(value);
							event.target.value = value.toString();
						}}
						className={classnames('thumb thumb--zindex-3', {
							'thumb--zindex-5': minVal > max - 100
						})}
					/>
					<input
						type="range"
						min={min}
						max={max}
						value={maxVal}
						ref={maxValRef}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							const value = Math.max(+event.target.value, minVal + 1);
							setMaxVal(value);
							event.target.value = value.toString();
						}}
						className="thumb thumb--zindex-4"
					/>
					<div className="slider">
						<div className="slider__track"></div>
						<div ref={range} className="slider__range"></div>
						<div className="slider__left-value">{minVal}</div>
						<div className="slider__right-value">{maxVal}</div>
					</div>
				</div>
				<p className="pl-2 text-xs text-center md:pl-8 md:text-lg">max</p></div>
			
		</>
	);
};
  
export default RangeInput;