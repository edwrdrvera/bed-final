/**
 * @interface Sighting
 * @description Interface for a Pokémon sighting.
 *
 * @openapi
 * components:
 *   schemas:
 *     Sighting:
 *       type: object
 *       required:
 *         - id
 *         - trainerId
 *         - locationId
 *         - pokemonName
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the sighting.
 *         trainerId:
 *           type: string
 *           description: The ID of the trainer who made the sighting.
 *         locationId:
 *           type: string
 *           description: The ID of the location where the sighting occurred.
 *         pokemonName:
 *           type: string
 *           description: The name of the Pokémon that was sighted.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the sighting occurred.
 */
export interface Sighting {
	id: string;
	trainerId: string;
	locationId: string;
	pokemonName: string;
	date: Date;
}

/**
 * @interface SightingInput
 * @description Interface for creating a new sighting.
 *
 * @openapi
 * components:
 *   schemas:
 *     SightingInput:
 *       type: object
 *       required:
 *         - trainerId
 *         - locationId
 *         - pokemonName
 *         - date
 *       properties:
 *         trainerId:
 *           type: string
 *           description: The ID of the trainer making the sighting.
 *         locationId:
 *           type: string
 *           description: The ID of the location where the sighting occurred.
 *         pokemonName:
 *           type: string
 *           description: The name of the Pokémon sighted.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time the sighting took place.
 */
export interface SightingInput {
	trainerId: string;
	locationId: string;
	pokemonName: string;
	date: Date;
}

/**
 * @interface SightingUpdate
 * @description Interface for updating an existing sighting.
 *
 * @openapi
 * components:
 *   schemas:
 *     SightingUpdate:
 *       type: object
 *       properties:
 *         trainerId:
 *           type: string
 *           description: The updated ID of the trainer making the sighting.
 *         locationId:
 *           type: string
 *           description: The updated ID of the location where the sighting occurred.
 *         pokemonName:
 *           type: string
 *           description: The updated name of the Pokémon sighted.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The updated date and time the sighting occurred.
 */
export interface SightingUpdate {
	trainerId?: string;
	locationId?: string;
	pokemonName?: string;
	date?: Date;
}
