import { Trainer, TrainerInput, TrainerUpdate } from "../models/trainerModel";
import { PokemonInTeam } from "../models/pokemonModel";
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
import { getPokemonTeamDataByName } from "./getPokemonService";

const COLLECTION: string = "trainers";

/**
 * Creates a new trainer document in Firestore.
 * Fetches minimal Pokemon data for the provided Pokemon names in the team.
 * Initializes the trainer with a null UID.
 *
 * @param trainerData - The data for the new trainer.
 * @returns A promise that resolves to the created trainer object.
 */
export const createTrainer = async (
	trainerData: TrainerInput
): Promise<Trainer> => {
	const dataToSave: Omit<Trainer, "id"> = {
		name: trainerData.name,
		age: trainerData.age,
		region: trainerData.region,
		team: [],
	};

	if (trainerData.team && trainerData.team.length > 0) {
		const fetchedPokemonData: PokemonInTeam[] = await Promise.all(
			trainerData.team.map(async (pokemonName) => {
				const pokemonData: PokemonInTeam | null =
					await getPokemonTeamDataByName(pokemonName);
				if (pokemonData) {
					return pokemonData;
				} else {
					throw new Error(`Pokemon '${pokemonName}' not found.`);
				}
			})
		);
		dataToSave.team = fetchedPokemonData;
	}
	const id: string = await createDocument(COLLECTION, dataToSave);
	const newTrainer: Trainer = {
		id,
		...dataToSave,
	};

	return newTrainer;
};

/**
 * Retrieves all trainer documents from the Firestore collection.
 *
 * @returns A promise that resolves to an array of Trainer objects.
 */
export const getAllTrainers = async (): Promise<Trainer[]> => {
	const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
		COLLECTION
	);

	return snapshot.docs.map((doc) => {
		const data: FirebaseFirestore.DocumentData = doc.data();
		return { id: doc.id, ...data } as Trainer;
	});
};

/**
 * Retrieves a specific trainer document by its ID from Firestore.
 *
 * @param id - The ID of the trainer document to retrieve.
 * @returns A promise that resolves to the found Trainer object.
 */
export const getTrainerById = async (id: string): Promise<Trainer> => {
	const doc: DocumentSnapshot<DocumentData, DocumentData> =
		await getDocumentById(COLLECTION, id);
	const data: DocumentData = doc.data() as DocumentData;
	const trainer: Trainer = { id: doc.id, ...data } as Trainer;
	return trainer;
};

/**
 * Update a specific trainer document by its ID in Firestore.
 * Fetches minimal Pokemon data for the provided Pokemon names in the team.
 * Allows updating for the linked Firebase UID
 *
 * @param id - The ID of the trainer document to update.
 * @param trainerData - The data to update the trainer document with.
 * @returns A promise that resolves to the updated Trainer object.
 */
export const updateTrainer = async (
	id: string,
	trainerData: TrainerUpdate
): Promise<Trainer> => {
	await updateDocument(COLLECTION, id, trainerData);
	const updatedTrainer: Trainer = await getTrainerById(id);
	return updatedTrainer;
};

/**
 * Deletes a trainer document by its ID from Firestore.
 *
 * @param id - The ID of the trainer document to delete.
 * @returns A promise that resolves to void.
 */
export const deleteTrainer = async (id: string): Promise<void> => {
	await deleteDocument(COLLECTION, id);
};
