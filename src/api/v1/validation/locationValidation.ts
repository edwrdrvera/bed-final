import Joi, { ObjectSchema } from "joi";

/**
 * Joi validation schema for validating the request body when creating a
 * new location.
 */
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
			Joi.string().trim().empty("").messages({
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

/**
 * Joi validation schema for validating the request body when updating an
 * existing location.
 */
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
