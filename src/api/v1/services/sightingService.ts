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

const SIGHTINGS_COLLECTION: string = "sightings";
const TRAINERS_COLLECTION: string = "trainers";
const LOCATIONS_COLLECTION: string = "locations";

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

	const sightingDate =
		typeof sightingData.date === "string"
			? new Date(sightingData.date)
			: sightingData.date;

	const dataToSave: Omit<Sighting, "id"> = {
		trainerId: sightingData.trainerId,
		locationId: sightingData.locationId,
		pokemonName: validPokemon.name,
		date: sightingDate,
	};

	const id = await createDocument(SIGHTINGS_COLLECTION, dataToSave);
	return {
		id,
		...dataToSave,
	} as Sighting;
};

export const getAllSightings = async (): Promise<Sighting[]> => {
	const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
		SIGHTINGS_COLLECTION
	);

	return snapshot.docs.map((doc) => {
		const data: FirebaseFirestore.DocumentData = doc.data();
		return { id: doc.id, ...data } as Sighting;
	});
};

export const getSightingById = async (id: string): Promise<Sighting> => {
	const doc: DocumentSnapshot<DocumentData, DocumentData> =
		await getDocumentById(SIGHTINGS_COLLECTION, id);
	const data: DocumentData = doc.data() as DocumentData;
	const sighting: Sighting = { id: doc.id, ...data } as Sighting;
	return sighting;
};

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

export const deleteSighting = async (id: string): Promise<void> => {
	await deleteDocument(SIGHTINGS_COLLECTION, id);
};
