import { PokemonInTeam } from "./pokemonModel";

export interface Trainer {
	id: string;
	name: string;
	age: number;
	team: PokemonInTeam[];
}

export interface TrainerInput {
	name: string;
	age: number;
	team: string[];
}

export interface TrainerUpdate {
	name?: string;
	age?: number;
	team?: string[];
}
