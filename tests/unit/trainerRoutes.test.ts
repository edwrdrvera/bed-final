import request from "supertest";
import app from "../../src/app";
import {
	createTrainer,
	getAllTrainers,
	getTrainerById,
	updateTrainer,
	deleteTrainer,
} from "../../src/api/v1/controllers/trainerController";
import {
	TrainerUpdate,
	TrainerInput,
} from "../../src/api/v1/models/trainerModel";
import { auth } from "../../config/firebaseConfig";

jest.mock("../../src/api/v1/controllers/trainerController", () => ({
	createTrainer: jest.fn((req, res) => res.status(200).send()),
	getAllTrainers: jest.fn((req, res) => res.status(200).send()),
	getTrainerById: jest.fn((req, res) => res.status(200).send()),
	updateTrainer: jest.fn((req, res) => res.status(200).send()),
	deleteTrainer: jest.fn((req, res) => res.status(200).send()),
}));

describe("Trainer Routes", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /api/v1/trainers", () => {
		it("should call createTrainer controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "admin",
			});

			const mockTrainerData: TrainerInput = {
				name: "Ash",
				age: 10,
				region: "Kanto",
				team: ["pikachu"],
			};
			await request(app)
				.post("/api/v1/trainers")
				.set("Authorization", "Bearer testToken") // Set Authorization header
				.send(mockTrainerData);
			expect(createTrainer).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/trainers", () => {
		it("should call getAllTrainers controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "user",
			});

			await request(app)
				.get("/api/v1/trainers")
				.set("Authorization", "Bearer testToken");
			expect(getAllTrainers).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/trainers/:id", () => {
		it("should call getTrainerById controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "user",
			});

			await request(app)
				.get("/api/v1/trainers/1")
				.set("Authorization", "Bearer testToken");
			expect(getTrainerById).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/trainers/:id", () => {
		it("should call updateTrainer controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "manager",
			});
			const newTrainerData: TrainerUpdate = {
				name: "New Name",
				age: 20,
				region: "New Region",
			};

			await request(app)
				.put("/api/v1/trainers/1")
				.set("Authorization", "Bearer testToken") // Set Authorization header
				.send(newTrainerData);
			expect(updateTrainer).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/trainers/:id", () => {
		it("should call deleteTrainer controller", async () => {
			(auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
				uid: "testUserID",
				role: "admin",
			});
			await request(app)
				.delete(`/api/v1/trainers/1`)
				.set("Authorization", "Bearer testToken");
			expect(deleteTrainer).toHaveBeenCalled();
		});
	});
});
