import request from "supertest";
import app from "../../src/app";
import {
	createSighting,
	getAllSightings,
	getSightingById,
	updateSighting,
	deleteSighting,
} from "../../src/api/v1/controllers/sightingController";

import {
	SightingInput,
	SightingUpdate,
} from "../../src/api/v1/models/sightingModel";

jest.mock("../../src/api/v1/controllers/sightingController", () => ({
	createSighting: jest.fn((req, res) => res.status(200).send()),
	getAllSightings: jest.fn((req, res) => res.status(200).send()),
	getSightingById: jest.fn((req, res) => res.status(200).send()),
	updateSighting: jest.fn((req, res) => res.status(200).send()),
	deleteSighting: jest.fn((req, res) => res.status(200).send()),
}));

describe("Sighting Routes", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /api/v1/sightings", () => {
		it("should call createSighting controller", async () => {
			const mockSightingData: SightingInput = {
				trainerId: "trainer-ash",
				locationId: "location-pallet",
				pokemonName: "pikachu",
				date: new Date("2025-04-06T10:00:00Z"),
			};
			await request(app).post("/api/v1/sightings").send(mockSightingData);
			expect(createSighting).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/sightings", () => {
		it("should call getAllSightings controller", async () => {
			await request(app).get("/api/v1/sightings");
			expect(getAllSightings).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/sightings/:id", () => {
		it("should call getSightingById controller", async () => {
			await request(app).get(`/api/v1/sightings/1`);
			expect(getSightingById).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/sightings/:id", () => {
		it("should call updateSighting controller", async () => {
			const newSightingData: SightingUpdate = {
				trainerId: "trainer-brock",
				locationId: "location-mountain",
				pokemonName: "geodude",
				date: new Date("2025-04-07T11:00:00Z"),
			};
			await request(app).put(`/api/v1/sightings/1`).send(newSightingData);
			expect(updateSighting).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/sightings/:id", () => {
		it("should call deleteSighting controller", async () => {
			await request(app).delete(`/api/v1/sightings/1`);
			expect(deleteSighting).toHaveBeenCalled();
		});
	});
});
