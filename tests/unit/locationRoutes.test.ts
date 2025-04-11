import request from "supertest";
import app from "../../src/app";
import {
	createLocation,
	getAllLocations,
	getLocationById,
	updateLocation,
	deleteLocation,
} from "../../src/api/v1/controllers/locationController";
import {
	LocationUpdate,
	LocationInput,
} from "../../src/api/v1/models/locationModel";

jest.mock("../../src/api/v1/controllers/locationController", () => ({
	createLocation: jest.fn((req, res) => res.status(200).send()),
	getAllLocations: jest.fn((req, res) => res.status(200).send()),
	getLocationById: jest.fn((req, res) => res.status(200).send()),
	updateLocation: jest.fn((req, res) => res.status(200).send()),
	deleteLocation: jest.fn((req, res) => res.status(200).send()),
}));

describe("Location Routes", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /api/v1/locations", () => {
		it("should call createLocation controller", async () => {
			const mockLocationData: LocationInput = {
				addressName: "123 Main St",
				terrain: "City",
				pokemon: ["pikachu"],
			};
			await request(app).post("/api/v1/locations").send(mockLocationData);
			expect(createLocation).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/locations", () => {
		it("should call getAllLocations controller", async () => {
			await request(app).get("/api/v1/locations");
			expect(getAllLocations).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/locations/:id", () => {
		it("should call getLocationByID controller", async () => {
			await request(app).get(`/api/v1/locations/1`);
			expect(getLocationById).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/locations/:id", () => {
		it("should call updateLocation controller", async () => {
			const newLocationData: LocationUpdate = {
				addressName: "New Address",
				terrain: "New Terrain",
			};
			await request(app).put("/api/v1/locations/1").send(newLocationData);
			expect(updateLocation).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/locations/:id", () => {
		it("should call deleteLocations controller", async () => {
			await request(app).delete(`/api/v1/locations/1`);
			expect(deleteLocation).toHaveBeenCalled();
		});
	});
});
