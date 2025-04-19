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
import { auth } from "../../config/firebaseConfig";

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
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "admin",
			});

			const mockSightingData: SightingInput = {
				trainerId: "trainer-ash",
				locationId: "location-pallet",
				pokemonName: "pikachu",
				date: new Date("2025-04-06T10:00:00Z"),
			};

			const response = await request(app)
				.post("/api/v1/sightings")
				.set("Authorization", "Bearer testToken")
				.send(mockSightingData);

			expect(createSighting).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/sightings", () => {
		it("should call getAllSightings controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "user",
			});

			await request(app)
				.get("/api/v1/sightings")
				.set("Authorization", "Bearer testToken");
			expect(getAllSightings).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/sightings/:id", () => {
		it("should call getSightingById controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "user",
			});

			await request(app)
				.get("/api/v1/sightings/1")
				.set("Authorization", "Bearer testToken");
			expect(getSightingById).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/sightings/:id", () => {
		it("should call updateSighting controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "manager",
			});

			const newSightingData: SightingUpdate = {
				trainerId: "trainer-brock",
				locationId: "location-mountain",
				pokemonName: "geodude",
			};

			await request(app)
				.put("/api/v1/sightings/testSightingId")
				.set("Authorization", "Bearer testToken")
				.send(newSightingData);

			expect(updateSighting).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/sightings/:id", () => {
		it("should call deleteSighting controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "admin",
			});

			await request(app)
				.delete("/api/v1/sightings/1")
				.set("Authorization", "Bearer testToken");
			expect(deleteSighting).toHaveBeenCalled();
		});
	});
});
