import * as trainerService from "../../src/api/v1/services/trainerService";
import {
	Trainer,
	TrainerInput,
	TrainerUpdate,
} from "../../src/api/v1/models/trainerModel";

import { getPokemonTeamDataByName } from "../../src/api/v1/services/getPokemonService";
import { PokemonInTeam } from "../../src/api/v1/models/pokemonModel";
import {
	createDocument,
	getDocuments,
	getDocumentById,
	updateDocument,
	deleteDocument,
} from "../../src/api/v1/repositories/firestoreRepository";
import {
	QuerySnapshot,
	QueryDocumentSnapshot,
	DocumentData,
	DocumentSnapshot,
} from "firebase-admin/firestore";
import { before } from "node:test";

jest.mock("../../src/api/v1/services/getPokemonService");
jest.mock("../../src/api/v1/repositories/firestoreRepository", () => ({
	createDocument: jest.fn(),
	getDocuments: jest.fn(),
	updateDocument: jest.fn(),
	getDocumentById: jest.fn(),
	deleteDocument: jest.fn(),
}));

const mockGetPokemonTeamDataByName = getPokemonTeamDataByName as jest.Mock;

describe("Trainer Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("createTrainer", () => {
		it("should create a trainer without pokemon details if none are provided", async () => {
			const trainerInput: TrainerInput = {
				name: "Red",
				age: 10,
				region: "Kanto",
				team: [],
			};
			const expectedTrainer: Omit<Trainer, "id"> = {
				name: "Red",
				age: 10,
				region: "Kanto",
				team: [],
			};

			(createDocument as jest.Mock).mockResolvedValue("newTrainerId");

			await trainerService.createTrainer(trainerInput);

			expect(createDocument).toHaveBeenCalledTimes(1);
			expect(createDocument).toHaveBeenCalledWith("trainers", expectedTrainer);
		});

		it("should create a trainer with pokemon details if provided", async () => {
			// Arrange
			const trainerInput: TrainerInput = {
				name: "Red",
				age: 10,
				region: "Kanto",
				team: ["pikachu"],
			};

			const mockPikachuData: PokemonInTeam = {
				name: "pikachu",
				type: ["electric"],
			};

			const expectedTrainerId = "newTrainerId";

			const expectedDataToSave: Omit<Trainer, "id"> = {
				name: "Red",
				age: 10,
				region: "Kanto",
				team: [mockPikachuData],
			};

			const expectedResult: Trainer = {
				id: expectedTrainerId,
				...expectedDataToSave,
			};

			// Mock the pokemon service function
			mockGetPokemonTeamDataByName.mockImplementation(async (name) => {
				if (name === "pikachu") return mockPikachuData;
				return null;
			});

			(createDocument as jest.Mock).mockResolvedValueOnce(expectedTrainerId);

			const result = await trainerService.createTrainer(trainerInput);

			expect(result).toEqual(expectedResult);
			expect(mockGetPokemonTeamDataByName).toHaveBeenCalledTimes(1);
			expect(mockGetPokemonTeamDataByName).toHaveBeenCalledWith("pikachu");
			expect(createDocument).toHaveBeenCalledTimes(1);
			expect(createDocument).toHaveBeenCalledWith(
				"trainers",
				expectedDataToSave
			);
		});
	});

	describe("getAllTrainers", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("should return all trainers", async () => {
			const mockTrainerData1: Omit<Trainer, "id"> = {
				name: "Red",
				age: 10,
				region: "Kanto",
				team: [
					{
						name: "pikachu",
						type: ["electric"],
					},
				],
			};
			const mockTrainerData2: Omit<Trainer, "id"> = {
				name: "Ash",
				age: 10,
				region: "Kanto",
				team: [
					{
						name: "pikachu",
						type: ["electric"],
					},
				],
			};

			const mockDocs: QueryDocumentSnapshot[] = [
				{
					id: "trainerId1",
					data: () => mockTrainerData1 as DocumentData,
				} as QueryDocumentSnapshot,
				{
					id: "trainerId2",
					data: () => mockTrainerData2 as DocumentData,
				} as QueryDocumentSnapshot,
			];

			const mockSnapshot: QuerySnapshot = {
				docs: mockDocs,
			} as QuerySnapshot;

			const expectedResult: Trainer[] = [
				{ id: "trainerId1", ...mockTrainerData1 }, // Combine ID and data
				{ id: "trainerId2", ...mockTrainerData2 }, // Combine ID and data
			];

			(getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);
			const result = await trainerService.getAllTrainers();

			expect(expectedResult).toEqual(result);
			expect(getDocuments).toHaveBeenCalledTimes(1);
			expect(getDocuments).toHaveBeenCalledWith("trainers");
		});
	});

	describe("getTrainerById", () => {
		it("should return trainer data by ID", async () => {
			const mockTrainerData: Omit<Trainer, "id"> = {
				name: "Red",
				age: 10,
				region: "Kanto",
				team: [
					{
						name: "pikachu",
						type: ["electric"],
					},
				],
			};

			const mockDoc: DocumentSnapshot<DocumentData, DocumentData> = {
				id: "trainerId1",
				data: () => mockTrainerData as DocumentData,
			} as DocumentSnapshot<DocumentData, DocumentData>;

			const expectedResult: Trainer = {
				id: "trainerId1",
				...mockTrainerData,
			};

			(getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

			const result = await trainerService.getTrainerById("trainerId1");

			expect(result).toEqual(expectedResult);
			expect(getDocumentById).toHaveBeenCalledTimes(1);
			expect(getDocumentById).toHaveBeenCalledWith("trainers", "trainerId1");
		});
	});

	describe("updateTrainer", () => {
		it("should update trainer data", async () => {
			const trainerId = "trainerId1";
			const trainerUpdateData: TrainerUpdate = {
				name: "Updated Trainer",
				age: 15,
				region: "Updated Region",
				team: ["pikachu"],
			};

			await trainerService.updateTrainer(trainerId, trainerUpdateData);

			expect(updateDocument).toHaveBeenCalledTimes(1);
			expect(updateDocument).toHaveBeenCalledWith(
				"trainers",
				trainerId,
				trainerUpdateData
			);
		});
	});

	describe("deleteTrainer", () => {
		it("should delete a trainer by ID", async () => {
			const trainerId = "trainerId1";

			await trainerService.deleteTrainer(trainerId);

			expect(deleteDocument).toHaveBeenCalledTimes(1);
			expect(deleteDocument).toHaveBeenCalledWith("trainers", trainerId);
		});
	});
});
