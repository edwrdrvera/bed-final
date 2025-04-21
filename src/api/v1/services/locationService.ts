import {
	LocationInput,
	Location,
	LocationUpdate,
} from "../models/locationModel";
import { PokemonData } from "../models/pokemonModel";
import {
	DocumentData,
	DocumentSnapshot,
} from "node_modules/firebase-admin/lib/firestore";
import {
	createDocument,
	getDocuments,
	getDocumentById,
	updateDocument,
	deleteDocument,
} from "../repositories/firestoreRepository";
import { getPokemonDetailsByName } from "./getPokemonService";

const COLLECTION: string = "locations";

/**
 * Creates a new location document in Firestore.
 * Fetches Pokemon data for the provided Pokemon names.
 *
 * @param locationData - The data for the new location.
 * @returns A promise that resolves to the created location object.
 */
export const createLocation = async (
	locationData: LocationInput
): Promise<Location> => {
	const dataToSave: Omit<Location, "id"> = {
		addressName: locationData.addressName,
		terrain: locationData.terrain,
		pokemon: [],
	};

	if (locationData.pokemon && locationData.pokemon.length > 0) {
		const fetchedPokemonData: PokemonData[] = await Promise.all(
			locationData.pokemon.map(async (pokemonName) => {
				const pokemonData: PokemonData | null = await getPokemonDetailsByName(
					pokemonName
				);
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

/**
 * Retrieves all location documents from the Firestore collection.
 *
 * @returns A promise that resolves to an array of location objects.
 */
export const getAllLocations = async (): Promise<Location[]> => {
	const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
		COLLECTION
	);

	return snapshot.docs.map((doc) => {
		const data: FirebaseFirestore.DocumentData = doc.data();
		return { id: doc.id, ...data } as Location;
	});
};

/**
 * Retrieves a location document by its ID from the Firestore collection.
 *
 * @param id - The ID of the location document to retrieve.
 * @returns A promise that resolves to the location object.
 */
export const getLocationById = async (id: string): Promise<Location> => {
	const doc: DocumentSnapshot<DocumentData, DocumentData> =
		await getDocumentById(COLLECTION, id);
	const data: DocumentData = doc.data() as DocumentData;
	const location: Location = { id: doc.id, ...data } as Location;
	return location;
};

/**
 * Updates an existing location document in the Firestore collection by its ID.
 *
 * @param id - The ID of the location document to update.
 * @param locationData - The data to update the location document with.
 * @returns A promise that resolves to the updated location object.
 */
export const updateLocation = async (
	id: string,
	locationData: LocationUpdate
): Promise<Location> => {
	await updateDocument(COLLECTION, id, locationData);
	const updatedLocation: Location = await getLocationById(id);
	return updatedLocation;
};

export const deleteLocation = async (id: string): Promise<void> => {
	await deleteDocument(COLLECTION, id);
};
