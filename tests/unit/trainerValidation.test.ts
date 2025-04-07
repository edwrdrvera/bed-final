import { Request, Response, NextFunction } from "express";
import {
	validate,
	validateRequest,
} from "../../src/api/v1/middleware/validate";
import {
	createTrainerSchema,
	updateTrainerSchema,
} from "../../src/api/v1/validation/trainerValidation";
import { PokemonInTeam } from "../../src/api/v1/models/pokemonModel";

interface Trainer {
	id?: string;
	name: string;
	age?: number;
	region: string;
	team: string[];
}

describe("validate middleware for trainer", () => {
	it("should not throw an error for valid createTrainerSchema", () => {
		const trainer: Trainer = {
			id: "1",
			name: "Ash",
			age: 10,
			region: "Kanto",
			team: ["pikachu"],
		};
		expect(() => {
			validate(createTrainerSchema, trainer);
		}).not.toThrow();
	});

	it("should not throw an error for valid updateTrainerSchema", () => {
		const trainer: Trainer = {
			id: "1",
			name: "Ash",
			age: 10,
			region: "Kanto",
			team: ["pikachu"],
		};
		expect(() => {
			validate(updateTrainerSchema, trainer);
		}).not.toThrow();
	});

	it("should throw an error for empty name", () => {
		const trainer: Partial<Trainer> = {
			name: "",
			region: "Kanto",
		};
		expect(() => {
			validate(createTrainerSchema, trainer);
		}).toThrow();
	});

	it("should throw an error for empty region", () => {
		const trainer: Partial<Trainer> = {
			name: "Ash",
			region: "",
		};
		expect(() => {
			validate(createTrainerSchema, trainer);
		}).toThrow();
	});

	it("should throw an error for invalid age", () => {
		const trainer: Partial<Trainer> = {
			name: "Ash",
			age: -5,
			region: "Kanto",
		};
		expect(() => {
			validate(createTrainerSchema, trainer);
		}).toThrow();
	});
});

describe("validateRequest middleware for trainer", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: NextFunction;

	beforeEach(() => {
		req = { body: {} };
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		next = jest.fn();
	});

	it("should call next for valid request body", () => {
		req.body = {
			name: "Ash",
			age: 10,
			region: "Kanto",
			team: ["pikachu"],
		};
		validateRequest(createTrainerSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(next).toHaveBeenCalled();
	});

	it("should return 400 for invalid request body", () => {
		req.body = {
			name: "",
			age: -5,
			region: "Kanto",
			team: ["pikachu"],
		};
		validateRequest(createTrainerSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(res.status).toHaveBeenCalledWith(400);
	});
	it("should return 400 for invalid request body in updateTrainerSchema", () => {
		req.body = {
			name: "",
			age: -5,
			region: "Kanto",
			team: ["pikachu"],
		};
		validateRequest(updateTrainerSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(res.status).toHaveBeenCalledWith(400);
	});
	it("should call next for valid updateTrainerSchema", () => {
		req.body = {
			id: "1",
			name: "Ash",
			age: 10,
			region: "Kanto",
			team: ["pikachu"],
		};
		validateRequest(updateTrainerSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(next).toHaveBeenCalled();
	});
});
