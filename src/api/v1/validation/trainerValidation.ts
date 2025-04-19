import Joi, { ObjectSchema } from "joi";

/**
 * Joi validation schema for validating the request body when creating a
 * new trainer.
 */
export const createTrainerSchema: ObjectSchema = Joi.object({
	id: Joi.string()
		.optional()
		.messages({ "string.empty": "Trainer ID cannot be empty" }),
	name: Joi.string().trim().required().messages({
		"any.required": "name is required",
		"string.empty": "name cannot be empty",
	}),
	age: Joi.number().integer().positive().optional().messages({
		"number.base": "age must be a number",
		"number.integer": "age must be an integer",
		"number.positive": "age must be a positive number",
	}),
	region: Joi.string().trim().optional().messages({
		"string.empty": "region cannot be empty",
	}),
	team: Joi.array()
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
			"array.base": "team must be an array",
			"array.includesRequiredUnknowns": "team array must contain strings",
		}),
});

/**
 * Joi validation schema for validating the request body when updating an
 * existing trainer.
 */
export const updateTrainerSchema: ObjectSchema = Joi.object({
	id: Joi.string()
		.optional()
		.messages({ "string.empty": "Trainer ID cannot be empty" }),
	name: Joi.string().trim().optional().messages({
		"string.empty": "name cannot be empty",
	}),
	age: Joi.number().integer().positive().optional().messages({
		"number.base": "age must be a number",
		"number.integer": "age must be an integer",
		"number.positive": "age must be a positive number",
	}),
	region: Joi.string().trim().optional().messages({
		"string.empty": "region cannot be empty",
	}),
	team: Joi.array()
		.items(
			Joi.string().trim().empty("").messages({
				"string.base": "Pokemon name must be a string",
				"string.empty": "Pokemon name cannot be empty",
				"any.required": "Pokemon name is required within the array",
			})
		)
		.optional()
		.messages({
			"array.base": "team must be an array",
			"array.includesRequiredUnknowns": "team array must contain strings",
		}),
})
	.min(1)
	.messages({
		"object.min":
			"Update request body cannot be empty. At least one field (name, age, team) must be provided.",
	});
