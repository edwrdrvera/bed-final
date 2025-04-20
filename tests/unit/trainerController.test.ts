jest.mock("../../src/api/v1/services/trainerService", () => ({
	createTrainer: jest.fn((req, res) => res.status(200).send()),
	getAllTrainers: jest.fn((req, res) => res.status(200).send()),
	getTrainerById: jest.fn((req, res) => res.status(200).send()),
	updateTrainer: jest.fn((req, res) => res.status(200).send()),
	deleteTrainer: jest.fn((req, res) => res.status(200).send()),
}));

import { Request, Response, NextFunction } from "express";
import * as controllerModule from "../../src/api/v1/controllers/trainerController";
import * as serviceModule from "../../src/api/v1/services/trainerService";
import {
	Trainer,
	TrainerInput,
	TrainerUpdate,
} from "../../src/api/v1/models/trainerModel";

jest.mock("../../src/api/v1/services/locationService");

describe("Trainer Controller", () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNext: NextFunction;
	let trainerList: Trainer[];

	beforeEach(() => {
		mockReq = {
			body: {},
			params: {},
		};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		mockNext = jest.fn();

		trainerList = [
			{
				id: "1",
				name: "Ash",
				age: 10,
				region: "Kanto",
				team: [
					{
						name: "pikachu",
						type: ["electric"],
					},
				],
				uid: null,
			},
			{
				id: "2",
				name: "Misty",
				age: 12,
				region: "Johto",
				team: [
					{
						name: "bulbasaur",
						type: ["grass", "poison"],
					},
				],
				uid: null,
			},
		];
	});

	describe("createTrainer", () => {
		it("should create a trainer", async () => {
			const trainerInput: TrainerInput = {
				name: "Ash",
				age: 10,
				region: "Kanto",
				team: ["pikachu"],
			};

			(serviceModule.createTrainer as jest.Mock).mockResolvedValue(
				trainerList[0]
			);

			mockReq.body = trainerInput;

			await controllerModule.createTrainer(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.createTrainer as jest.Mock).toHaveBeenCalledWith(
				trainerInput
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: trainerList[0],
				message: "Trainer Created",
			});
		});
	});

	describe("getAllTrainers controller", () => {
		it("should call getAllTrainers service and handle successful operation", async () => {
			(serviceModule.getAllTrainers as jest.Mock).mockResolvedValue(
				trainerList
			);

			await controllerModule.getAllTrainers(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.getAllTrainers as jest.Mock).toHaveBeenCalled();
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: trainerList,
			});
		});
	});

	describe("getTrainerById", () => {
		it("should get a trainer by ID", async () => {
			mockReq.params = { id: "1" };

			(serviceModule.getTrainerById as jest.Mock).mockResolvedValue(
				trainerList[0]
			);

			await controllerModule.getTrainerById(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.getTrainerById as jest.Mock).toHaveBeenCalledWith(
				"1"
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: trainerList[0],
				message: "Trainer Found",
			});
		});
	});

	describe("updateTrainer", () => {
		it("should update a trainer", async () => {
			const trainerUpdate: TrainerUpdate = {
				name: "Updated Trainer",
				age: 15,
				region: "Updated Region",
				team: ["pikachu"],
			};

			mockReq.params = { id: "1" };
			mockReq.body = trainerUpdate;

			(serviceModule.updateTrainer as jest.Mock).mockResolvedValue(
				trainerList[0]
			);

			await controllerModule.updateTrainer(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.updateTrainer as jest.Mock).toHaveBeenCalledWith(
				"1",
				trainerUpdate
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: trainerList[0],
				message: "Trainer Updated",
			});
		});
	});

	describe("deleteTrainer", () => {
		it("should delete a trainer by ID", async () => {
			mockReq.params = { id: "1" };

			(serviceModule.deleteTrainer as jest.Mock).mockResolvedValue({});

			await controllerModule.deleteTrainer(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.deleteTrainer as jest.Mock).toHaveBeenCalledWith(
				"1"
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: null,
				message: "Trainer Deleted",
			});
		});
	});
});
