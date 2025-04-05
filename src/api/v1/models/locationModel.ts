import { PokemonData } from "./pokemonModel";

export interface LocationInput {
	addressName: string;
	terrain: string;
	pokemon: string[];
}

export interface LocationUpdate {
	addressName?: string;
	terrain?: string;
	pokemon?: string[];
}

export interface Location {
	id: string;
	addressName: string;
	terrain: string;
	pokemon: PokemonData[];
}
