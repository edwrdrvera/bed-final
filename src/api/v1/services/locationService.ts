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
import { getPokemonDetailsByName } from "./pokemonService";

const COLLECTION: string = "locations";

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

export const getAllLocations = async (): Promise<Location[]> => {
	const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
		COLLECTION
	);

	return snapshot.docs.map((doc) => {
		const data: FirebaseFirestore.DocumentData = doc.data();
		return { id: doc.id, ...data } as Location;
	});
};

export const getLocationById = async (id: string): Promise<Location> => {
	const doc: DocumentSnapshot<DocumentData, DocumentData> =
		await getDocumentById(COLLECTION, id);
	const data: DocumentData = doc.data() as DocumentData;
	const location: Location = { id: doc.id, ...data } as Location;
	return location;
};

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
