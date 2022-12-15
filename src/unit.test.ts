// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import mockData from './mockData.json';
import { getUnitsByType, getUnitsMinMax, getAvgSqft, unitHasAmenities, getUnitAmenities, unitRange, isUnitInRange } from './components/helpers';
import { IUnit } from './types';


// jest --watch --collect-coverage

const data = mockData;

describe('should be able to get all units by their type', () => {
	test('studio', () => {
		const studio = getUnitsByType(data[0], 'studio');
		const studios = getUnitsByType(data[5], 'studio');
		expect(studio[0].type).toBe('studio');
		expect(studios[5].type).toBe('studio');
	});
	
	test('oneBdrm', () => {
		const oneBdrm = getUnitsByType(data[0], 'oneBdrm');
		const oneBdrms = getUnitsByType(data[5], 'oneBdrm');
		expect(oneBdrm[0].type).toBe('oneBdrm');
		expect(oneBdrms[5].type).toBe('oneBdrm');
	});

	test('twoBdrm', () => {
		const twoBdrm = getUnitsByType(data[0], 'twoBdrm');
		const twoBdrms = getUnitsByType(data[5], 'twoBdrm');
		expect(twoBdrm[0].type).toBe('twoBdrm');
		expect(twoBdrms[5].type).toBe('twoBdrm');
	});

	test('threeBdrm', () => {
		const threeBdrm = getUnitsByType(data[0], 'threeBdrm');
		const threeBdrms = getUnitsByType(data[5], 'threeBdrm');
		expect(threeBdrm[0].type).toBe('threeBdrm');
		expect(threeBdrms[5].type).toBe('threeBdrm');
	});

	test('fourBdrm', () => {
		const fourBdrm = getUnitsByType(data[0], 'fourBdrm');
		const fourBdrms = getUnitsByType(data[5], 'fourBdrm');
		expect(fourBdrm[0].type).toBe('fourBdrm');
		expect(fourBdrms[5].type).toBe('fourBdrm');
	});
});
	
describe('for range of occupants', () => {
	test('studio', () => { 
		const studio = getUnitsByType(data[0], 'studio');
		const studioMin = getUnitsMinMax(studio)[0];
		const studioMax = getUnitsMinMax(studio)[1];
		expect(studioMin).toBe(1);
		expect(studioMax).toBe(3);
		expect(studioMin).toBeLessThan(studioMax);
	});
	test('oneBdrm', () => { 
		const oneBdrm = getUnitsByType(data[0], 'oneBdrm');
		const oneBdrmMin = getUnitsMinMax(oneBdrm)[0];
		const oneBdrmMax = getUnitsMinMax(oneBdrm)[1];
		expect(oneBdrmMin).toBe(1);
		expect(oneBdrmMax).toBe(5);
		expect(oneBdrmMin).toBeLessThan(oneBdrmMax);
	});
	test('twoBdrm', () => { 
		const twoBdrm = getUnitsByType(data[0], 'twoBdrm');
		const twoBdrmMin = getUnitsMinMax(twoBdrm)[0];
		const twoBdrmMax = getUnitsMinMax(twoBdrm)[1];
		expect(twoBdrmMin).toBe(1);
		expect(twoBdrmMax).toBe(8);
		expect(twoBdrmMin).toBeLessThan(twoBdrmMax);
	});
	test('threeBdrm', () => { 
		const threeBdrm = getUnitsByType(data[0], 'threeBdrm');
		const threeBdrmMin = getUnitsMinMax(threeBdrm)[0];
		const threeBdrmMax = getUnitsMinMax(threeBdrm)[1];
		expect(threeBdrmMin).toBe(2);
		expect(threeBdrmMax).toBe(11);
		expect(threeBdrmMin).toBeLessThan(threeBdrmMax);
	});
	test('fourBdrm', () => { 
		const fourBdrm = getUnitsByType(data[0], 'fourBdrm');
		const fourBdrmMin = getUnitsMinMax(fourBdrm)[0];
		const  fourBdrmMax = getUnitsMinMax(fourBdrm)[1];
		expect(fourBdrmMin).toBe(4);
		expect(fourBdrmMax).toBe(12);
		expect(fourBdrmMin).toBeLessThan(fourBdrmMax);
	});
});


describe('to get avg sq ft', () => {
	test('to get avg sq ft', () => {

		const studio = getUnitsByType(data[0], 'studio');
		const studioSqFt = getAvgSqft(studio);
		expect(studioSqFt).toBe(2580);
	});
	test('to get avg sq ft', () => {
	
		const oneBdrm = getUnitsByType(data[0], 'oneBdrm');
		const  oneBdrmSqFt = getAvgSqft(oneBdrm);
		expect(oneBdrmSqFt).toBe(3891);
	});
	test('to get avg sq ft', () => {

		const twoBdrm = getUnitsByType(data[0], 'twoBdrm');
		const twoBdrmSqFt = getAvgSqft(twoBdrm);
		expect(twoBdrmSqFt).toBe(2768);
	});
	test('to get avg sq ft', () => {

		const threeBdrm = getUnitsByType(data[0], 'threeBdrm');
		const threeBdrmSqFt = getAvgSqft(threeBdrm);
		expect(threeBdrmSqFt).toBe(2167);
	});
	test('to get avg sq ft', () => {
		const fourBdrm = getUnitsByType(data[0], 'fourBdrm');
		const fourBdrmSqFt = getAvgSqft(fourBdrm);
		expect(fourBdrmSqFt).toBe(3022);
	});
});



describe('filter amenities by unit', () => {
	test('should return amenities from a single unit', () => {

		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer'
			]
		};
		

		expect(getUnitAmenities(unit)).toEqual([
			'fireplace',
			'air conditioning',
			'accessible bathroom',
			'elevator',
			'wheel chair access',
			'washer & dryer'
		]);

	});
	test('should compare and check that a unit has required amenities', () => {
		const amenitychecked = [
			'fireplace',
			'air conditioning',
			'accessible bathroom',
			'elevator',
			'wheel chair access',
			'washer & dryer'];
		
		const unitAmenities = [
			'fireplace',
			'air conditioning',
			'accessible bathroom',
			'elevator',
			'wheel chair access',
			'washer & dryer'
		];

		expect(unitHasAmenities(unitAmenities, amenitychecked)).toBeTruthy();
	});
	test('should check that unitHasAmenities() and getUnitAmenities() work together', () => {
		const amenitychecked = [
			'fireplace',
			'air conditioning',
			'accessible bathroom',
			'elevator',
			'wheel chair access',
			'washer & dryer'];
		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer'
			]
		};

		const answer = unitHasAmenities(getUnitAmenities(unit), amenitychecked);
		expect(answer).toBeTruthy();
	});
	test('should return true because amenities checked are an exact match', () => {
		const amenitychecked = [
			'fireplace',
			'air conditioning',
			'accessible bathroom',
			'elevator',
			'wheel chair access',
			'washer & dryer'];
		
		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer'
			]
		};
		const answer = unitHasAmenities(getUnitAmenities(unit), amenitychecked);
		expect(answer).toBeTruthy();
	});
	test('should return false, studio doesnt have one of the checked amenities', () => {

		const amenitychecked = [
			'extra amenity',
			'fireplace',
			'air conditioning',
			'accessible bathroom',
			'elevator',
			'wheel chair access',
			'washer & dryer'];
		
		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		};
		const answer = unitHasAmenities(getUnitAmenities(unit), amenitychecked);
		expect(answer).toBeFalsy();
	});
	test('should filter out amenities that do not have required amenities', () => {
		// list of studio units
		const studios = getUnitsByType(data[0], 'studio');

		const amenitychecked = [
			'washer & dryer'];
		
		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		};

		const filtered = studios.filter((studio: IUnit) => unitHasAmenities(getUnitAmenities(studio), amenitychecked));

		expect(filtered.length).toBe(4);
	});
	test('to get avg sq ft', () => {
		const fourBdrm = getUnitsByType(data[0], 'fourBdrm');
		const fourBdrmSqFt = getAvgSqft(fourBdrm);
		expect(fourBdrmSqFt).toBe(3022);
	});
});

describe('filter range by unit', () => {
	test('should return min and max from a single unit', () => {

		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		};

		expect(unitRange(unit)).toEqual([1,3]);

	});
	test('test if unit is within range, return true bc unit max is less than selected max', () => {

		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		};

		expect(isUnitInRange(unitRange(unit), [1,6])).toBeTruthy();

	});
	test('test if unit is within range, return false bc unit max is greater than selected max', () => {

		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		};

		expect(isUnitInRange(unitRange(unit), [1,2])).toBeFalsy();

	});
	test('test if unit is within range, return false bc unit min is less than selected min', () => {

		const unit = {
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		};

		expect(isUnitInRange(unitRange(unit), [3,4])).toBeFalsy();

	});

	test('test if unit is within range, return true bc unit min is greater than selected min', () => {

		const unit = {
			type: 'studio',
			minOccupancy: 2,
			maxOccupancy: 3,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		};

		expect(isUnitInRange(unitRange(unit), [1,4])).toBeTruthy();

	});
	test('should not filter out units because all are within range', () => {
		const units = [{
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 5,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		},
		{
			type: 'studio',
			minOccupancy: 2,
			maxOccupancy: 6,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		},
		{
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 8,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		}];

		const filtered = units.filter((unit: IUnit) => isUnitInRange(unitRange(unit), [1,20]));

		expect(filtered.length).toBe(3);
	});
	test('should filter out units that have more than 7', () => {
		const units = [{
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 5,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		},
		{
			type: 'studio',
			minOccupancy: 2,
			maxOccupancy: 6,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		},
		{
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 8,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		}];

		const filtered = units.filter((unit: IUnit) => isUnitInRange(unitRange(unit), [1,7]));

		expect(filtered.length).toBe(2);
	});
	test('should filter out units that dont have at least 3', () => {
		const units = [{
			type: 'studio',
			minOccupancy: 1,
			maxOccupancy: 5,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		},
		{
			type: 'studio',
			minOccupancy: 3,
			maxOccupancy: 9,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		},
		{
			type: 'studio',
			minOccupancy: 2,
			maxOccupancy: 8,
			sqft: 1633,
			amenities: [
				'fireplace',
				'air conditioning',
				'accessible bathroom',
				'elevator',
				'wheel chair access',
				'washer & dryer',
			]
		}];

		const filtered = units.filter((unit: IUnit) => isUnitInRange(unitRange(unit), [3,10]));

		expect(filtered.length).toBe(1);
	});
});

describe('getting overall max and min for range slider', () => {
	test('should get max and min from all units', () => {
		const a = data.map((i: { units: IUnit[]; }) => i.units.map(i => i)).flat().flat();
		expect(getUnitsMinMax(a)).toEqual([1,13]);
	});
});
