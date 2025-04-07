import { Trainer, TrainerInput, TrainerUpdate } from "../models/trainerModel";
import { PokemonData, PokemonInTeam } from "../models/pokemonModel";
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
				const pokemonData = await getPokemonTeamDataByName(pokemonName);
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

export const getAllTrainers = async (): Promise<Trainer[]> => {
	const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
		COLLECTION
	);

	return snapshot.docs.map((doc) => {
		const data: FirebaseFirestore.DocumentData = doc.data();
		return { id: doc.id, ...data } as Trainer;
	});
};

export const getTrainerById = async (id: string): Promise<Trainer> => {
	const doc: DocumentSnapshot<DocumentData, DocumentData> =
		await getDocumentById(COLLECTION, id);
	const data: DocumentData = doc.data() as DocumentData;
	const trainer: Trainer = { id: doc.id, ...data } as Trainer;
	return trainer;
};

export const updateTrainer = async (
	id: string,
	trainerData: TrainerUpdate
): Promise<Trainer> => {
	await updateDocument(COLLECTION, id, trainerData);
	const updatedTrainer: Trainer = await getTrainerById(id);
	return updatedTrainer;
};

export const deleteTrainer = async (id: string): Promise<void> => {
	await deleteDocument(COLLECTION, id);
};
