import * as sightingService from "../../src/api/v1/services/sightingService";
import {
	Sighting,
	SightingInput,
	SightingUpdate,
} from "../../src/api/v1/models/sightingModel";

import { PokemonData } from "../../src/api/v1/models/pokemonModel";

import { getPokemonDetailsByName } from "../../src/api/v1/services/getPokemonService";
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

jest.mock("../../src/api/v1/services/getPokemonService");
jest.mock("../../src/api/v1/repositories/firestoreRepository", () => ({
	createDocument: jest.fn(),
	getDocuments: jest.fn(),
	updateDocument: jest.fn(),
	getDocumentById: jest.fn(),
	deleteDocument: jest.fn(),
}));

const mockGetPokemonDetailsByName: jest.Mock =
	getPokemonDetailsByName as jest.Mock;

const TRAINERS_COLLECTION: string = "trainers";
const LOCATIONS_COLLECTION: string = "locations";
const SIGHTINGS_COLLECTION: string = "sightings";

describe("Sighting Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("createSighting", () => {
		it("should create a sighting without pokemon details if none are provided", async () => {
			// Arrange
			const sightingInput: SightingInput = {
				trainerId: "trainer-ash",
				locationId: "loc-pallet",
				pokemonName: "pikachu",
				date: new Date("2025-04-06T10:00:00Z"),
			};
			const sightingDate = new Date("2025-04-06T10:00:00Z");

			const mockTrainerDoc: DocumentSnapshot = {
				exists: true,
			} as DocumentSnapshot;
			const mockLocationDoc: DocumentSnapshot = {
				exists: true,
			} as DocumentSnapshot;
			const mockPokemonData: PokemonData = {
				id: "25",
				name: "pikachu",
				type: ["electric"],
				abilities: [{ name: "static" }],
				height: 4,
				weight: 60,
			};

			const expectedDataToSave: SightingInput = {
				trainerId: sightingInput.trainerId,
				locationId: sightingInput.locationId,
				pokemonName: mockPokemonData.name,
				date: sightingDate,
			};
			const expectedSightingId: string = "sighting-123";
			const expectedResult: Sighting = {
				id: expectedSightingId,
				...expectedDataToSave,
			};

			// Setup mocks
			(getDocumentById as jest.Mock)
				.mockResolvedValueOnce(mockTrainerDoc)
				.mockResolvedValueOnce(mockLocationDoc);
			mockGetPokemonDetailsByName.mockResolvedValueOnce(mockPokemonData);
			(createDocument as jest.Mock).mockResolvedValueOnce(expectedSightingId);

			// Act
			const result: Sighting = await sightingService.createSighting(
				sightingInput
			);

			// Assert
			expect(result).toEqual(expectedResult);
			expect(getDocumentById).toHaveBeenCalledTimes(2);
			expect(getDocumentById).toHaveBeenCalledWith(
				TRAINERS_COLLECTION,
				sightingInput.trainerId
			);
			expect(getDocumentById).toHaveBeenCalledWith(
				LOCATIONS_COLLECTION,
				sightingInput.locationId
			);
			expect(mockGetPokemonDetailsByName).toHaveBeenCalledTimes(1);
			expect(mockGetPokemonDetailsByName).toHaveBeenCalledWith(
				sightingInput.pokemonName
			);
			expect(createDocument).toHaveBeenCalledTimes(1);
			expect(createDocument).toHaveBeenCalledWith(
				SIGHTINGS_COLLECTION,
				expectedDataToSave
			);
		});
	});

	describe("getAllSightings", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should return all sightings", async () => {
			// Arrange
			const mockSightingData1: Omit<Sighting, "id"> = {
				trainerId: "trainer1",
				locationId: "location1",
				pokemonName: "pikachu",
				date: new Date("2025-04-06T10:00:00Z"),
			};

			const mockSightingData2: Omit<Sighting, "id"> = {
				trainerId: "trainer2",
				locationId: "location2",
				pokemonName: "charmander",
				date: new Date("2025-04-07T10:00:00Z"),
			};

			const mockDocs: QueryDocumentSnapshot[] = [
				{
					id: "sighting1",
					data: () => mockSightingData1 as DocumentData,
				} as QueryDocumentSnapshot,
				{
					id: "sighting2",
					data: () => mockSightingData2 as DocumentData,
				} as QueryDocumentSnapshot,
			];

			const mockSnapshot: QuerySnapshot = {
				docs: mockDocs,
			} as QuerySnapshot;

			const expectedResult: Sighting[] = [
				{ id: "sighting1", ...mockSightingData1 },
				{ id: "sighting2", ...mockSightingData2 },
			];

			(getDocuments as jest.Mock).mockResolvedValueOnce(mockSnapshot);

			// Act
			const result: Sighting[] = await sightingService.getAllSightings();

			// Assert
			expect(result).toEqual(expectedResult);
			expect(getDocuments).toHaveBeenCalledTimes(1);
			expect(getDocuments).toHaveBeenCalledWith(SIGHTINGS_COLLECTION);
		});
	});

	describe("getSightingById", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should return a sighting by ID", async () => {
			// Arrange
			const mockSightingData: Omit<Sighting, "id"> = {
				trainerId: "trainer1",
				locationId: "location1",
				pokemonName: "pikachu",
				date: new Date("2025-04-06T10:00:00Z"),
			};

			const mockDoc: DocumentSnapshot<DocumentData, DocumentData> = {
				id: "sighting1",
				data: () => mockSightingData as DocumentData,
			} as DocumentSnapshot;

			const expectedResult: Sighting = {
				id: "sighting1",
				...mockSightingData,
			};

			(getDocumentById as jest.Mock).mockResolvedValueOnce(mockDoc);

			// Act
			const result: Sighting = await sightingService.getSightingById(
				"sighting1"
			);

			// Assert
			expect(result).toEqual(expectedResult);
			expect(getDocumentById).toHaveBeenCalledTimes(1);
			expect(getDocumentById).toHaveBeenCalledWith(
				SIGHTINGS_COLLECTION,
				"sighting1"
			);
		});
	});

	describe("updateSighting", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("should update a sighting and return the updated sighting", async () => {
			// Arrange
			const sightingId: string = "sighting-update-1";
			const sightingUpdateData: SightingUpdate = {
				pokemonName: "raichu",
			};

			const mockValidPokemon: PokemonData = {
				id: "26",
				name: "raichu",
				type: ["electric"],
				abilities: [],
				height: 8,
				weight: 300,
			};

			const expectedDataForUpdate: object = {
				pokemonName: sightingUpdateData.pokemonName,
			};

			const finalSightingData: Omit<Sighting, "id"> = {
				trainerId: "trainer-ash",
				locationId: "location-pallet",
				pokemonName: "Raichu",
				date: new Date("2025-04-06T10:00:00Z"),
			};

			const mockUpdatedDocSnapshot = {
				exists: true,
				id: sightingId,
				data: () => finalSightingData as DocumentData,
			} as DocumentSnapshot;

			const expectedResult: Sighting = {
				id: sightingId,
				...finalSightingData,
			};

			mockGetPokemonDetailsByName.mockResolvedValueOnce(mockValidPokemon);
			(updateDocument as jest.Mock).mockResolvedValueOnce(undefined);
			(getDocumentById as jest.Mock).mockResolvedValueOnce(
				mockUpdatedDocSnapshot
			);

			const result: Sighting = await sightingService.updateSighting(
				sightingId,
				sightingUpdateData
			);

			expect(result).toEqual(expectedResult);

			expect(mockGetPokemonDetailsByName).toHaveBeenCalledTimes(1);
			expect(mockGetPokemonDetailsByName).toHaveBeenCalledWith(
				sightingUpdateData.pokemonName
			);
			expect(updateDocument).toHaveBeenCalledTimes(1);

			expect(updateDocument).toHaveBeenCalledWith(
				SIGHTINGS_COLLECTION,
				sightingId,
				expectedDataForUpdate
			);
			expect(getDocumentById).toHaveBeenCalledTimes(1);
			expect(getDocumentById).toHaveBeenCalledWith(
				SIGHTINGS_COLLECTION,
				sightingId
			);
		});
	});

	describe("deleteSighting", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("should delete a sighting by ID", async () => {
			// Arrange
			const sightingId: string = "sighting-delete-1";

			// Act
			await sightingService.deleteSighting(sightingId);

			// Assert
			expect(deleteDocument).toHaveBeenCalledTimes(1);
			expect(deleteDocument).toHaveBeenCalledWith(
				SIGHTINGS_COLLECTION,
				sightingId
			);
		});
	});
});
