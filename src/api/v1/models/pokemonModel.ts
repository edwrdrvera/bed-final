/**
 * @interface PokemonData
 * @description Interface for Pokémon data.
 *
 * @openapi
 * components:
 *   schemas:
 *     PokemonData:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - abilities
 *         - type
 *         - height
 *         - weight
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the Pokémon.
 *         name:
 *           type: string
 *           description: The name of the Pokémon.
 *         abilities:
 *           type: array
 *           items:
 *             type: object
 *           description: A list of abilities the Pokémon has.
 *         type:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of types the Pokémon belongs to.
 *         height:
 *           type: number
 *           description: The height of the Pokémon in meters.
 *         weight:
 *           type: number
 *           description: The weight of the Pokémon in kilograms.
 */
export interface PokemonData {
	id: string;
	name: string;
	abilities: object[];
	type: string[];
	height: number;
	weight: number;
}

/**
 * @interface PokemonInTeam
 * @description Interface for Pokémon in a trainer's team.
 *
 * @openapi
 * components:
 *   schemas:
 *     PokemonInTeam:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the Pokémon in the team.
 *         type:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of types the Pokémon belongs to.
 */
export interface PokemonInTeam {
	name: string;
	type: string[];
}
