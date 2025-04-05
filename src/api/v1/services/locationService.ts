import { get } from "http";
import { LocationInput, Location } from "../models/locationModel";
import { PokemonData } from "../models/pokemonModel";
import { createDocument } from "../repositories/firestoreRepository";
import { getPokemonDetailsByName } from "./pokemonService";

const COLLECTION: string = "locations";

export const createLocation = async (
	locationData: LocationInput
): Promise<Location> => {
	console.log("Creating location with data:", locationData);

	const dataToSave: Omit<Location, "id"> = {
		addressName: locationData.addressName,
		terrain: locationData.terrain,
		pokemon: [],
	};

	console.log(dataToSave);

	if (locationData.pokemon && locationData.pokemon.length > 0) {
		const fetchedPokemonData: PokemonData[] = await Promise.all(
			locationData.pokemon.map(async (pokemonName) => {
				const pokemonData = await getPokemonDetailsByName(pokemonName);
				if (pokemonData) {
					return pokemonData;
				} else {
					throw new Error(`Pokemon '${pokemonName}' not found.`);
				}
			})
		);

		dataToSave.pokemon = fetchedPokemonData;
	}

	const id: string = await createDocument(COLLECTION, dataToSave);
	return { id, ...dataToSave } as Location;
};
