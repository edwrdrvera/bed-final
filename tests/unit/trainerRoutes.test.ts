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
			const mockTrainerData: TrainerInput = {
				name: "Ash",
				age: 10,
				region: "Kanto",
				team: ["pikachu"],
			};
			await request(app).post("/api/v1/trainers").send(mockTrainerData);
			expect(createTrainer).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/trainers", () => {
		it("should call getAllTrainers controller", async () => {
			await request(app).get("/api/v1/trainers");
			expect(getAllTrainers).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/trainers/:id", () => {
		it("should call getTrainerById controller", async () => {
			await request(app).get(`/api/v1/trainers/1`);
			expect(getTrainerById).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/trainers/:id", () => {
		it("should call updateTrainer controller", async () => {
			const newTrainerData: TrainerUpdate = {
				name: "New Name",
				age: 20,
				region: "New Region",
			};
			await request(app).put(`/api/v1/trainers/1`).send(newTrainerData);
			expect(updateTrainer).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/trainers/:id", () => {
		it("should call deleteTrainer controller", async () => {
			await request(app).delete(`/api/v1/trainers/1`);
			expect(deleteTrainer).toHaveBeenCalled();
		});
	});
});
