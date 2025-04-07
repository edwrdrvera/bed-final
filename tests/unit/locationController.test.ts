jest.mock("../../src/api/v1/services/locationService", () => ({
	createLocation: jest.fn((req, res) => res.status(200).send()),
	getAllLocations: jest.fn((req, res) => res.status(200).send()),
	getLocationById: jest.fn((req, res) => res.status(200).send()),
	updateLocation: jest.fn((req, res) => res.status(200).send()),
	deleteLocation: jest.fn((req, res) => res.status(200).send()),
}));

import { Request, Response, NextFunction } from "express";
import * as controllerModule from "../../src/api/v1/controllers/locationController";
import * as serviceModule from "../../src/api/v1/services/locationService";
import {
	Location,
	LocationInput,
} from "../../src/api/v1/models/locationModel";

// Mock the service module
jest.mock("../../src/api/v1/services/locationService");

describe("Location Controller", () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNext: NextFunction;
	let locationList: Location[];

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

		locationList = [
			{
				id: "1",
				addressName: "123 Main St",
				terrain: "City",
				pokemon: [
					{
						id: "1",
						name: "pikachu",
						abilities: [{ name: "static" }],
						type: ["electric"],
						height: 1,
						weight: 10,
					},
				],
			},
			{
				id: "2",
				addressName: "456 Elm St",
				terrain: "Forest",
				pokemon: [
					{
						id: "2",
						name: "bulbasaur",
						abilities: [{ name: "overgrow" }],
						type: ["grass", "poison"],
						height: 1,
						weight: 10,
					},
				],
			},
		];
	});

	describe("createLocation controller", () => {
		it("should call createLocation service and handle successful operation", async () => {
			const mockLocationData: LocationInput = {
				addressName: "123 Main St",
				terrain: "City",
				pokemon: ["pikachu"],
			};

			(serviceModule.createLocation as jest.Mock).mockResolvedValue(
				locationList[0]
			);

			mockReq.body = mockLocationData;

			await controllerModule.createLocation(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.createLocation as jest.Mock).toHaveBeenCalledWith(
				mockLocationData
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: locationList[0],
				message: "Location Created",
			});
		});
	});

	describe("getAllLocations controller", () => {
		it("should call getAllLocations service and handle successful operation", async () => {
			(serviceModule.getAllLocations as jest.Mock).mockResolvedValue(
				locationList
			);

			await controllerModule.getAllLocations(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.getAllLocations as jest.Mock).toHaveBeenCalled();
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: locationList,
			});
		});
	});

	describe("getLocationById controller", () => {
		it("should call getLocationById service and handle successful operation", async () => {
			mockReq.params = { id: "locationId" };

			(serviceModule.getLocationById as jest.Mock).mockResolvedValue(
				locationList[0]
			);

			await controllerModule.getLocationById(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.getLocationById as jest.Mock).toHaveBeenCalledWith(
				"locationId"
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: locationList[0],
				message: "Location Found",
			});
		});
	});

	describe("updateLocation controller", () => {
		it("should call updateLocation service and handle successful operation", async () => {
			mockReq.params = { id: "locationId" };
			mockReq.body = {
				addressName: "Updated Address",
				terrain: "Updated Terrain",
			};

			(serviceModule.updateLocation as jest.Mock).mockResolvedValue(
				locationList[0]
			);

			await controllerModule.updateLocation(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.updateLocation as jest.Mock).toHaveBeenCalledWith(
				"locationId",
				mockReq.body
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: locationList[0],
				message: "Location Updated",
			});
		});
	});

	describe("deleteLocation controller", () => {
		it("should call deleteLocation service and handle successful operation", async () => {
			mockReq.params = { id: "locationId" };

			(serviceModule.deleteLocation as jest.Mock).mockResolvedValue(
				locationList[0]
			);

			await controllerModule.deleteLocation(
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			expect(serviceModule.deleteLocation as jest.Mock).toHaveBeenCalledWith(
				"locationId"
			);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				status: "success",
				data: null,
				message: "Location Deleted",
			});
		});
	});
});
