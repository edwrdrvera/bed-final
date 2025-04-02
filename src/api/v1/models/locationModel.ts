import { Pokemon } from "./pokemonModel";

export interface Location {
	id: string;
	addressName: string;
	terrain: string;
	pokemon: Pokemon[];
}
