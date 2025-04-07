import * as locationService from "../../src/api/v1/services/locationService";
import {
	Location,
	LocationInput,
	LocationUpdate,
} from "../../src/api/v1/models/locationModel";
import { getPokemonDetailsByName } from "../../src/api/v1/services/getPokemonService";
import { PokemonData } from "../../src/api/v1/models/pokemonModel";
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

const mockGetPokemonDetailsByName = getPokemonDetailsByName as jest.Mock;

describe("Location Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("createLocation", () => {
		it("should create a location without pokemon details if none are provided", async () => {
			const locationInput: LocationInput = {
				addressName: "123 Main St",
				terrain: "City",
				pokemon: [],
			};
			const expectedLocation: Omit<Location, "id"> = {
				addressName: "123 Main St",
				terrain: "City",
				pokemon: [],
			};

			(createDocument as jest.Mock).mockResolvedValue("newLocationId");

			await locationService.createLocation(locationInput);

			expect(createDocument).toHaveBeenCalledTimes(1);
			expect(createDocument).toHaveBeenCalledWith(
				"locations",
				expectedLocation
			);
		});

		it("should create a location with pokemon details if provided", async () => {
			const locationInput: LocationInput = {
				addressName: "123 Main St",
				terrain: "City",
				pokemon: ["pikachu"],
			};

			const mockPikachuData: PokemonData = {
				id: "1",
				name: "pikachu",
				abilities: [{ name: "static" }],
				type: ["electric"],
				height: 1,
				weight: 10,
			};

			const expectedPokemonData: PokemonData[] = [mockPikachuData];

			const expectedSavedLocation: Omit<Location, "id"> = {
				addressName: "123 Main St",
				terrain: "City",
				pokemon: expectedPokemonData,
			};

			const expectedLocationId = "newLocationId";

			const expectedResult: Location = {
				id: expectedLocationId,
				...expectedSavedLocation,
			};

			mockGetPokemonDetailsByName.mockImplementation(async (name) => {
				if (name === "pikachu") return mockPikachuData;
				return null;
			});

			(createDocument as jest.Mock).mockResolvedValue(expectedLocationId);

			const result = await locationService.createLocation(locationInput);

			expect(result).toEqual(expectedResult);
			expect(mockGetPokemonDetailsByName).toHaveBeenCalledTimes(1);
			expect(mockGetPokemonDetailsByName).toHaveBeenCalledWith("pikachu");
			expect(createDocument).toHaveBeenCalledTimes(1);
			expect(createDocument).toHaveBeenCalledWith(
				"locations",
				expectedSavedLocation
			);
		});
	});

	describe("getAllLocations", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should return all locations formatted correctly", async () => {
			const mockDate: Date = new Date();

			const mockLocationData1 = {
				addressName: "Pallet Town",
				terrain: "Town",
				pokemon: ["bulbasaur"],
				createdAt: mockDate,
				updatedAt: mockDate,
			};
			const mockLocationData2 = {
				addressName: "Viridian Forest",
				terrain: "Forest",
				pokemon: [],
				createdAt: mockDate,
				updatedAt: mockDate,
			};

			const mockDocs: QueryDocumentSnapshot[] = [
				{
					id: "location1",
					data: () => mockLocationData1 as DocumentData,
				} as QueryDocumentSnapshot,
				{
					id: "location2",
					data: () => mockLocationData2 as DocumentData,
				} as QueryDocumentSnapshot,
			];

			const mockSnapshot: QuerySnapshot = {
				docs: mockDocs,
			} as QuerySnapshot;

			const expectedResult: DocumentData[] = [
				{ id: "location1", ...mockLocationData1 },
				{ id: "location2", ...mockLocationData2 },
			];

			(getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);
			const result: Location[] = await locationService.getAllLocations();

			// Assert: Verify results and interactions
			expect(result).toEqual(expectedResult); // Check if the mapped result is correct
			expect(result).toHaveLength(2); // Check the number of items returned
			expect(getDocuments).toHaveBeenCalledTimes(1); // Ensure getDocuments was called once
			expect(getDocuments).toHaveBeenCalledWith("locations"); // Ensure it was called with the correct collection
		});
	});

	describe("getLocationById", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should return a location by ID", async () => {
			const mockDate: Date = new Date();

			const mockLocationData = {
				addressName: "Pallet Town",
				terrain: "Town",
				pokemon: ["bulbasaur"],
				createdAt: mockDate,
				updatedAt: mockDate,
			};

			const mockDoc: DocumentSnapshot = {
				id: "location1",
				data: () => mockLocationData as DocumentData,
			} as DocumentSnapshot;

			(getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

			const result: Location = await locationService.getLocationById(
				"location1"
			);

			const expectedResult = { id: "location1", ...mockLocationData };

			expect(result).toEqual(expectedResult);
			expect(getDocumentById).toHaveBeenCalledTimes(1);
			expect(getDocumentById).toHaveBeenCalledWith("locations", "location1");
		});
	});

	describe("updateLocation", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("should update a location and return the updated location", async () => {
			const locationId = "location1";
			const locationUpdateData: LocationUpdate = {
				addressName: "Updated Town",
				terrain: "Updated Terrain",
				pokemon: ["pikachu"],
			};

			const mockPikachuData: PokemonData = {
				id: "25",
				name: "pikachu",
				type: ["electric"],
				abilities: [{ name: "static" }],
				height: 4,
				weight: 60,
			};

			const expectedUpdatedLocation: Location = {
				id: locationId,
				addressName: "Updated Town", // Updated field
				terrain: "Updated Terrain", // Updated field
				pokemon: [mockPikachuData], // Updated field
			};

			(updateDocument as jest.Mock).mockResolvedValueOnce(undefined);

			const mockDocSnapshot = {
				exists: true,
				id: locationId,
				data: () =>
					({
						addressName: expectedUpdatedLocation.addressName,
						terrain: expectedUpdatedLocation.terrain,
						pokemon: expectedUpdatedLocation.pokemon,
					} as DocumentData),
			} as DocumentSnapshot;

			(getDocumentById as jest.Mock).mockResolvedValueOnce(mockDocSnapshot);

			// Act
			const result: Location = await locationService.updateLocation(
				locationId,
				locationUpdateData
			);

			expect(updateDocument).toHaveBeenCalledTimes(1);
			expect(updateDocument).toHaveBeenCalledWith(
				"locations",
				"location1",
				locationUpdateData
			);
			expect(result).toEqual(expectedUpdatedLocation);
		});
	});

	describe("deleteLocation", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("should remove location by ID from collection", async () => {
			const locationId: string = "location1";

			(deleteDocument as jest.Mock).mockResolvedValue(undefined);

			await locationService.deleteLocation(locationId);

			expect(deleteDocument).toHaveBeenCalledTimes(1);
			expect(deleteDocument).toHaveBeenCalledWith("locations", locationId);
		});
	});
});
