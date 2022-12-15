
export interface IProperty {
	id: string
	name: string
	picture: string
	units: IUnit[]
}
		
export interface IUnit {
			type: string
			minOccupancy: number
			maxOccupancy: number
			sqft: number
			amenities: string[]
}

export interface IAmenityCheckbox {
	checked: boolean;
	name: string;
}
