import { PokemonClient, Pokemon } from "pokenode-ts";
import { PokemonData, PokemonInTeam } from "../models/pokemonModel";

const api = new PokemonClient();

export const getPokemonDetailsByName = async (
	name: string
): Promise<PokemonData | null> => {
	const lowerCaseName = name.toLowerCase();
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

		return pokemonData as PokemonData; // Cast to Pokemon type
	} catch (error: any) {
		if (error.response && error.response.status === 404) {
			console.warn(`Pokemon named '${name}' not found in PokeAPI.`);
		} else {
			console.error(
				`Error fetching Pokemon '${name}' from PokeAPI:`,
				error.message || error
			);
		}
		return null; // Return null on error/not found
	}
};

export const getPokemonTeamDataByName = async (
	name: string
): Promise<PokemonInTeam | null> => {
	const lowerCaseName = name.toLowerCase();
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
