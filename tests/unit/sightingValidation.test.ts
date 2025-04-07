import { Request, Response, NextFunction } from "express";
import {
	validate,
	validateRequest,
} from "../../src/api/v1/middleware/validate";

import {
	createSightingSchema,
	updateSightingSchema,
} from "../../src/api/v1/validation/sightingValidation";

interface Sighting {
	id?: string;
	trainerId?: string;
	locationId?: string;
	pokemonName?: string;
	date?: string;
}

describe("validate middleware for sighting", () => {
	it("should not throw an error for valid createSightingSchema", () => {
		const sighting: Sighting = {
			trainerId: "1",
			locationId: "1",
			pokemonName: "pikachu",
			date: "2023-10-01",
		};
		expect(() => {
			validate(createSightingSchema, sighting);
		}).not.toThrow();
	});

	it("should not throw an error for valid updateSightingSchema", () => {
		const sighting: Sighting = {
			trainerId: "1",
			locationId: "1",
			pokemonName: "pikachu",
			date: "2023-10-01",
		};
		expect(() => {
			validate(updateSightingSchema, sighting);
		}).not.toThrow();
	});
	it("should throw an error for empty trainerId", () => {
		const sighting: Sighting = {
			trainerId: "",
			locationId: "1",
			pokemonName: "pikachu",
			date: "2023-10-01",
		};
		expect(() => {
			validate(createSightingSchema, sighting);
		}).toThrow();
	});

	it("should throw an error for empty locationId", () => {
		const sighting: Sighting = {
			trainerId: "1",
			locationId: "",
			pokemonName: "pikachu",
			date: "2023-10-01",
		};
		expect(() => {
			validate(createSightingSchema, sighting);
		}).toThrow();
	});
	it("should throw an error for empty pokemonName", () => {
		const sighting: Sighting = {
			trainerId: "1",
			locationId: "1",
			pokemonName: "",
			date: "2023-10-01",
		};
		expect(() => {
			validate(createSightingSchema, sighting);
		}).toThrow();
	});
	it("should throw an error for empty date", () => {
		const sighting: Sighting = {
			trainerId: "1",
			locationId: "1",
			pokemonName: "pikachu",
			date: "",
		};
		expect(() => {
			validate(createSightingSchema, sighting);
		}).toThrow();
	});
});

describe("validateRequest middleware for sighting", () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNext: NextFunction;

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
	});

	it("should call next for valid request", () => {
		mockReq.body = {
			trainerId: "1",
			locationId: "1",
			pokemonName: "pikachu",
			date: "2023-10-01",
		};

		validateRequest(createSightingSchema)(
			mockReq as Request,
			mockRes as Response,
			mockNext
		);

		expect(mockNext).toHaveBeenCalled();
	});

	it("should return 400 for invalid request", () => {
		mockReq.body = {
			trainerId: "",
			locationId: "1",
			pokemonName: "pikachu",
			date: "2023-10-01",
		};

		validateRequest(createSightingSchema)(
			mockReq as Request,
			mockRes as Response,
			mockNext
		);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({
			error: expect.any(String),
		});
	});
});
