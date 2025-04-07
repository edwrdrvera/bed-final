import Joi, { date, ObjectSchema } from "joi";

export const createSightingSchema: ObjectSchema = Joi.object({
	trainerId: Joi.string().trim().required().messages({
		"any.required": "trainerId is required",
		"string.empty": "trainerId cannot be empty",
	}),
	locationId: Joi.string().trim().required().messages({
		"any.required": "locationId is required",
		"string.empty": "locationId cannot be empty",
	}),
	pokemonName: Joi.string().trim().required().messages({
		"any.required": "pokemonName is required",
		"string.empty": "pokemonName cannot be empty",
	}),
	date: Joi.date().iso().required().messages({
		"any.required": "date is required",
		"date.base": "date must be a valid date",
	}),
	notes: Joi.string().trim().optional().allow("").messages({
		"string.base": "notes must be a string",
	}),
});

export const updateSightingSchema: ObjectSchema = Joi.object({
	trainerId: Joi.string().trim().optional().messages({
		"string.empty": "trainerId cannot be empty",
		"string.base": "trainerId must be a string",
	}),
	locationId: Joi.string().trim().optional().messages({
		"string.empty": "locationId cannot be empty",
		"string.base": "locationId must be a string",
	}),
	pokemonName: Joi.string().trim().optional().messages({
		"string.empty": "pokemonName cannot be empty",
		"string.base": "pokemonName must be a string",
	}),
	date: Joi.date().iso().optional().messages({
		"date.base": "date must be a valid date",
		"date.iso": "date must be in ISO format",
		"string.empty": "date cannot be empty",
	}),
	notes: Joi.string().trim().optional().allow("").messages({
		"string.base": "notes must be a string",
		"string.empty": "notes cannot be empty",
	}),
});
