import { PokemonData } from "./pokemonModel";

/**
 * @interface LocationInput
 * @description Interface for creating a new location.
 *
 * @openapi
 * components:
 *   schemas:
 *     LocationInput:
 *       type: object
 *       properties:
 *         addressName:
 *           type: string
 *           description: The name of the address or location.
 *         terrain:
 *           type: string
 *           description: The type of terrain (e.g., forest, mountain, etc.).
 *         pokemon:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of Pokémon associated with the location.
 */
export interface LocationInput {
	addressName: string;
	terrain: string;
	pokemon: string[];
}

/**
 * @interface LocationUpdate
 * @description Interface for updating an existing location.
 *
 * @openapi
 * components:
 *   schemas:
 *     LocationUpdate:
 *       type: object
 *       properties:
 *         addressName:
 *           type: string
 *           description: The updated name of the address or location.
 *         terrain:
 *           type: string
 *           description: The updated type of terrain.
 *         pokemon:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of Pokémon associated with the location (can be updated).
 */
export interface LocationUpdate {
	addressName?: string;
	terrain?: string;
	pokemon?: string[];
}

/**
 * @interface Location
 * @description Interface representing a location with its details.
 *
 * @openapi
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - id
 *         - addressName
 *         - terrain
 *         - pokemon
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the location.
 *         addressName:
 *           type: string
 *           description: The name of the address or location.
 *         terrain:
 *           type: string
 *           description: The type of terrain (e.g., forest, mountain, etc.).
 *         pokemon:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PokemonData'
 *           description: A list of Pokémon associated with the location.
 */
export interface Location {
	id: string;
	addressName: string;
	terrain: string;
	pokemon: PokemonData[];
}
