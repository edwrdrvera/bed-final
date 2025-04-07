jest.mock("../../src/api/v1/services/sightingService", () => ({
	createSighting: jest.fn(),
	getAllSightings: jest.fn(),
	getSightingById: jest.fn(),
	updateSighting: jest.fn(),
	deleteSighting: jest.fn(),
}));

import { Request, Response, NextFunction } from "express";
import * as controllerModule from "../../src/api/v1/controllers/sightingController";
import * as serviceModule from "../../src/api/v1/services/sightingService";
import {
	Sighting,
	SightingInput,
	SightingUpdate,
} from "../../src/api/v1/models/sightingModel";
import { messaging } from "firebase-admin";

jest.mock("../../src/api/v1/services/sightingService");

describe("Sighting Controller", () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNext: NextFunction;
	let sightingList: Sighting[];

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

		sightingList = [
			{
				id: "1",
				trainerId: "trainer-ash",
				locationId: "location-pallet",
				pokemonName: "pikachu",
				date: new Date("2025-04-06T10:00:00Z"),
			},
			{
				id: "2",
				trainerId: "trainer-brock",
				locationId: "location-mountain",
				pokemonName: "geodude",
				date: new Date("2025-04-07T11:00:00Z"),
			},
		];
	});

	describe("createSighting controller", () => {
		it("should create a sighting and handle successful operation", async () => {
			const sightingInput: SightingInput = {
				trainerId: "trainer-ash",
				locationId: "location-pallet",
				pokemonName: "pikachu",
				date: new Date("2025-04-06T10:00:00Z"),
			};

			(serviceModule.createSighting as jest.Mock).mockResolvedValue(
				sightingList[0]
			);

			mockReq.body = sightingInput;

			await controllerModule.createSighting(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.createSighting as jest.Mock).toHaveBeenCalledWith(
				sightingInput
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: sightingList[0],
				message: "Sighting Created",
			});
		});
	});

	describe("getAllSightings controller", () => {
		it("should call getAllSightings service and handle successful operation", async () => {
			(serviceModule.getAllSightings as jest.Mock).mockResolvedValue(
				sightingList
			);

			await controllerModule.getAllSightings(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.getAllSightings as jest.Mock).toHaveBeenCalled();
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: sightingList,
			});
		});
	});

	describe("getSightingById controller", () => {
		it("should call getSightingById service and handle successful operation", async () => {
			mockReq.params = { id: "sightingId" };

			(serviceModule.getSightingById as jest.Mock).mockResolvedValue(
				sightingList[0]
			);

			await controllerModule.getSightingById(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.getSightingById as jest.Mock).toHaveBeenCalledWith(
				"sightingId"
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: sightingList[0],
				message: "Sighting Found",
			});
		});
	});

	describe("updateSighting controller", () => {
		it("should call updateSighting service and handle successful operation", async () => {
			mockReq.params = { id: "sightingId" };
			const sightingUpdate: SightingUpdate = {
				pokemonName: "charizard",
			};

			(serviceModule.updateSighting as jest.Mock).mockResolvedValue(
				sightingList[0]
			);

			mockReq.body = sightingUpdate;

			await controllerModule.updateSighting(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.updateSighting as jest.Mock).toHaveBeenCalledWith(
				"sightingId",
				sightingUpdate
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: sightingList[0],
				message: "Sighting Updated",
			});
		});
	});

	describe("deleteSighting controller", () => {
		it("should call deleteSighting service and handle successful operation", async () => {
			mockReq.params = { id: "sightingId" };

			(serviceModule.deleteSighting as jest.Mock).mockResolvedValue(
				sightingList[0]
			);

			await controllerModule.deleteSighting(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.deleteSighting as jest.Mock).toHaveBeenCalledWith(
				"sightingId"
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: null,
				message: "Sighting Deleted",
			});
		});
	});
});
