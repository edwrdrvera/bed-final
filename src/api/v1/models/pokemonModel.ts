export interface PokemonData {
	id: string;
	name: string;
	abilities: object[];
	type: string[];
	height: number;
	weight: number;
}

export interface PokemonInTeam {
	name: string;
	type: string[];
}
