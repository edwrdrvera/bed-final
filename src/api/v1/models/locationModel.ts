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
 *       required:
 *         - addressName
 *         - terrain
 *       properties:
 *         addressName:
 *           type: string
 *           description: The name of the address or location.
 *           example: "Viridian Forest"
 *         terrain:
 *           type: string
 *           description: The type of terrain (e.g., forest, mountain, etc.).
 *           example: "Forest"
 *         pokemon:
 *           type: array
 *           description: A list of Pokémon associated with the location.
 *           items:
 *             type: string
 *             example: ["pikachu", "bulbasaur"]
 */
export interface LocationInput {
	addressName: string;
	terrain: string;
	pokemon?: string[];
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
 *           example: "Viridian Forest"
 *         terrain:
 *           type: string
 *           description: The updated type of terrain.
 *           example: "Forest"
 *         pokemon:
 *           type: array
 *           description: A list of Pokémon associated with the location (can be updated).
 *           items:
 *             type: string
 *             example: ["oddish"]
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
 *           example: "location-12345"
 *         addressName:
 *           type: string
 *           description: The name of the address or location.
 *           example: "Viridian Forest"
 *         terrain:
 *           type: string
 *           description: The type of terrain (e.g., forest, mountain, etc.).
 *           example: "Forest"
 *         pokemon:
 *           type: array
 *           description: A list of Pokémon associated with the location.
 *           items:
 *             $ref: '#/components/schemas/PokemonData'
 */
export interface Location {
	id: string;
	addressName: string;
	terrain: string;
	pokemon: PokemonData[];
}
