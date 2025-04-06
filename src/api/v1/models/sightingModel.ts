export interface Sighting {
	id: string;
	trainerId: string;
	locationId: string;
	pokemonName: string;
	date: Date;
	notes?: string;
}

export interface SightingInput {
	trainerId: string;
	locationId: string;
	pokemonName: string;
	date: Date;
}

export interface SightingUpdate {
	trainerId?: string;
	locationId?: string;
	pokemonName?: string;
	date?: Date;
}
