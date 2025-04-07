import { Request, Response, NextFunction } from "express";
import {
	validate,
	validateRequest,
} from "../../src/api/v1/middleware/validate";
import {
	createLocationSchema,
	updateLocationSchema,
} from "../../src/api/v1/validation/locationValidation";

interface Location {
	id?: string;
	addressName: string;
	terrain: string;
	pokemon?: string[];
}

describe("validate middleware for location", () => {
	it("should not throw an error for valid createLocationSchema", () => {
		const location: Location = {
			addressName: "123 Main St",
			terrain: "City",
			pokemon: ["pikachu"],
		};
		expect(() => {
			validate(createLocationSchema, location);
		}).not.toThrow();
	});

	it("should not throw an error for valid updateLocationSchema", () => {
		const location: Location = {
			id: "1",
			addressName: "123 Main St",
			terrain: "City",
			pokemon: ["pikachu"],
		};
		expect(() => {
			validate(updateLocationSchema, location);
		}).not.toThrow();
	});

	it("should throw an error for empty address name", () => {
		const location: Location = {
			addressName: "",
			terrain: "City",
		};
		expect(() => {
			validate(createLocationSchema, location);
		}).toThrow();
	});

	it("should throw an error for empty terrain", () => {
		const location: Location = {
			addressName: "123 Main St",
			terrain: "",
		};
		expect(() => {
			validate(createLocationSchema, location);
		}).toThrow();
	});
});

describe("validateRequest middleware for location", () => {
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

	it("should call next for valid createLocationSchema", () => {
		req.body = {
			addressName: "123 Main St",
			terrain: "City",
			pokemon: ["pikachu"],
		};
		validateRequest(createLocationSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(res.status).not.toHaveBeenCalled();
		expect(res.json).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalled();
	});

	it("should call next for valid updateLocationSchema", () => {
		req.body = {
			id: "1",
			addressName: "123 Main St",
			terrain: "City",
			pokemon: ["pikachu"],
		};
		validateRequest(updateLocationSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(res.status).not.toHaveBeenCalled();
		expect(res.json).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalled();
	});

	it("should return 400 for invalid createLocationSchema", () => {
		req.body = {
			addressName: "",
			terrain: "City",
		};
		validateRequest(createLocationSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: expect.any(String),
		});
		expect(next).not.toHaveBeenCalled();
	});

	it("should return 400 for invalid updateLocationSchema", () => {
		req.body = {
			id: "1",
			addressName: "",
			terrain: "City",
		};
		validateRequest(updateLocationSchema)(
			req as Request,
			res as Response,
			next
		);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: expect.any(String),
		});
		expect(next).not.toHaveBeenCalled();
	});
});
