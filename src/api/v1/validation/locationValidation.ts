import Joi, { ObjectSchema } from "joi";

export const createLocationSchema: ObjectSchema = Joi.object({
	id: Joi.string()
		.optional()
		.messages({ "string.empty": "Location ID cannot be empty" }),
	addressName: Joi.string().required().messages({
		"any.required": "Name is required",
		"string.empty": "Name cannot be empty",
	}),
	terrain: Joi.string().required().messages({
		"any.required": "Terrain is required",
		"string.empty": "Terrain cannot be empty",
	}),
	pokemon: Joi.array()
		.items(
			Joi.string().trim().required().messages({
				"string.base": "Pokemon name must be a string",
				"string.empty": "Pokemon name cannot be empty",
				"any.required": "Pokemon name is required within the array",
			})
		)
		.optional()
		.default([])
		.messages({
			"array.base": "pokemon must be an array",
		}),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
});

export const updateLocationSchema: ObjectSchema = Joi.object({
	id: Joi.string()
		.optional()
		.messages({ "string.empty": "Location ID cannot be empty" }),
	addressName: Joi.string().required().messages({
		"any.required": "Name is required",
		"string.empty": "Name cannot be empty",
	}),
	terrain: Joi.string().required().messages({
		"any.required": "Terrain is required",
		"string.empty": "Terrain cannot be empty",
	}),
	pokemon: Joi.array()
		.items(
			Joi.string().trim().required().messages({
				"string.base": "Pokemon name must be a string",
				"string.empty": "Pokemon name cannot be empty",
				"any.required": "Pokemon name is required within the array",
			})
		)
		.optional()
		.default([])
		.messages({
			"array.base": "pokemon must be an array",
		}),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
});
