import { PokemonClient, Pokemon } from "pokenode-ts";
import { PokemonData, PokemonInTeam } from "../models/pokemonModel";

const api: PokemonClient = new PokemonClient();

export const getPokemonDetailsByName = async (
	name: string
): Promise<PokemonData | null> => {
	const lowerCaseName: string = name.toLowerCase();
	try {
		const pokemon: Pokemon = await api.getPokemonByName(lowerCaseName);
		const pokemonDetails: Partial<Pokemon> = {
			id: pokemon.id,
			name: pokemon.name,
			height: pokemon.height,
			weight: pokemon.weight,
			abilities: pokemon.abilities,
			types: pokemon.types,
		};
		const pokemonData: PokemonData = {
			id: pokemonDetails.id?.toString() || "",
			name: pokemonDetails.name || "",
			abilities:
				pokemonDetails.abilities?.map((ability) => ({
					name: ability.ability.name,
				})) || [],
			type: pokemonDetails.types?.map((type) => type.type.name) || [],
			height: pokemonDetails.height || 0,
			weight: pokemonDetails.weight || 0,
		};

		return pokemonData as PokemonData;
	} catch (error) {
		console.error(`Error fetching Pokémon data: ${error}`);
		return null;
	}
};

export const getPokemonTeamDataByName = async (
	name: string
): Promise<PokemonInTeam | null> => {
	const lowerCaseName: string = name.toLowerCase();
	const pokemon: Pokemon = await api.getPokemonByName(lowerCaseName);
	const pokemonDetails: Partial<Pokemon> = {
		name: pokemon.name,
		types: pokemon.types,
	};
	const pokemonData: PokemonInTeam = {
		name: pokemonDetails.name || "",
		type: pokemonDetails.types?.map((type) => type.type.name) || [],
	};
	return pokemonData as PokemonInTeam;
};
