import { PokemonInTeam } from "./pokemonModel";

export interface Trainer {
	id: string;
	name: string;
	age: number;
	region: string;
	team: PokemonInTeam[];
}

export interface TrainerInput {
	name: string;
	age: number;
	region: string;
	team: string[];
}

export interface TrainerUpdate {
	name?: string;
	age?: number;
	region?: string;
	team?: string[];
}
