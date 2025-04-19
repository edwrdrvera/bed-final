import {
	Sighting,
	SightingInput,
	SightingUpdate,
} from "../models/sightingModel";
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
import { PokemonData } from "../models/pokemonModel";

// Constants for Firestore collections
const SIGHTINGS_COLLECTION: string = "sightings";
const TRAINERS_COLLECTION: string = "trainers";
const LOCATIONS_COLLECTION: string = "locations";

/**
 * Creates a new sighting document in Firestore.
 * Validates the trainer, location, and Pokemon data.
 *
 * @param sightingData - The data for the new sighting.
 * @returns A promise that resolves to the created sighting object.
 * @throws Error if the trainer, location, or Pokemon data is invalid.
 */
export const createSighting = async (
	sightingData: SightingInput
): Promise<Sighting> => {
	const trainerDoc: DocumentSnapshot<DocumentData> = await getDocumentById(
		TRAINERS_COLLECTION,
		sightingData.trainerId
	);

	const locationDoc: DocumentSnapshot<DocumentData> = await getDocumentById(
		LOCATIONS_COLLECTION,
		sightingData.locationId
	);

	const validPokemon: PokemonData | null = await getPokemonDetailsByName(
		sightingData.pokemonName
	);

	if (!trainerDoc.exists) {
		throw new Error(`Trainer with ID ${sightingData.trainerId} not found.`);
	}
	if (!locationDoc.exists) {
		throw new Error(`Location with ID ${sightingData.locationId} not found.`);
	}
	if (!validPokemon) {
		throw new Error(
			`Pokemon with name ${sightingData.pokemonName} not found.`
		);
	}

	const sightingDate: Date =
		typeof sightingData.date === "string"
			? new Date(sightingData.date)
			: sightingData.date;

	const dataToSave: Omit<Sighting, "id"> = {
		trainerId: sightingData.trainerId,
		locationId: sightingData.locationId,
		pokemonName: validPokemon.name,
		date: sightingDate,
	};

	const id: string = await createDocument(SIGHTINGS_COLLECTION, dataToSave);
	return {
		id,
		...dataToSave,
	} as Sighting;
};

/**
 * Retrieves all sighting documents from the Firestore collection.
 *
 * @returns A promise that resolves to an array of sighting objects.
 */
export const getAllSightings = async (): Promise<Sighting[]> => {
	const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
		SIGHTINGS_COLLECTION
	);

	return snapshot.docs.map((doc) => {
		const data: FirebaseFirestore.DocumentData = doc.data();
		return { id: doc.id, ...data } as Sighting;
	});
};

/**
 * Retrieves a specific sighting document by its ID from Firestore.
 *
 * @param id - The ID of the sighting document to retrieve.
 * @returns A promise that resolves to the sighting object.
 */
export const getSightingById = async (id: string): Promise<Sighting> => {
	const doc: DocumentSnapshot<DocumentData, DocumentData> =
		await getDocumentById(SIGHTINGS_COLLECTION, id);
	const data: DocumentData = doc.data() as DocumentData;
	const sighting: Sighting = { id: doc.id, ...data } as Sighting;
	return sighting;
};

/**
 * Updates an existing sighting document in Firestore by its ID.
 * Validates trainer, location, and Pokemon data if they exist.
 * Fetches details for any pokemon being updated.
 *
 * @param id - The ID of the sighting document to update.
 * @param sightingData - The data to update the sighting document with.
 * @returns A promise that resolves to the updated sighting object.
 */
export const updateSighting = async (
	id: string,
	sightingData: SightingUpdate
): Promise<Sighting> => {
	if (sightingData.pokemonName !== undefined) {
		const validPokemon: PokemonData | null = await getPokemonDetailsByName(
			sightingData.pokemonName
		);
		if (!validPokemon) {
			throw new Error(
				`Pokemon with name ${sightingData.pokemonName} not found.`
			);
		}
		sightingData.pokemonName = validPokemon.name;
	}

	if (sightingData.trainerId !== undefined) {
		const trainerDoc: DocumentSnapshot<DocumentData> = await getDocumentById(
			TRAINERS_COLLECTION,
			sightingData.trainerId
		);
		if (!trainerDoc.exists) {
			throw new Error(`Trainer with ID ${sightingData.trainerId} not found.`);
		}
	}
	if (sightingData.locationId !== undefined) {
		const locationDoc: DocumentSnapshot<DocumentData> = await getDocumentById(
			LOCATIONS_COLLECTION,
			sightingData.locationId
		);
		if (!locationDoc.exists) {
			throw new Error(
				`Location with ID ${sightingData.locationId} not found.`
			);
		}
	}

	await updateDocument(SIGHTINGS_COLLECTION, id, sightingData);
	const updatedSighting: Sighting = await getSightingById(id);
	return updatedSighting;
};

/**
 * Deletes a sighting document from Firestore by its ID.
 *
 * @param id - The ID of the sighting document to delete.
 * @returns A Promise resolving to void upon successful deletion.
 */
export const deleteSighting = async (id: string): Promise<void> => {
	await deleteDocument(SIGHTINGS_COLLECTION, id);
};
