import { PokemonInTeam } from "./pokemonModel";

/**
 * @interface Trainer
 * @description Interface for a Pokémon trainer.
 *
 * @openapi
 * components:
 *   schemas:
 *     Trainer:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - age
 *         - region
 *         - team
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the trainer.
 *         name:
 *           type: string
 *           description: The name of the Pokémon trainer.
 *         age:
 *           type: number
 *           description: The age of the trainer.
 *         region:
 *           type: string
 *           description: The region the trainer belongs to.
 *         team:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PokemonInTeam'
 *           description: A list of Pokémon in the trainer's team.
 */
export interface Trainer {
	id: string;
	name: string;
	age: number;
	region: string;
	team: PokemonInTeam[];
}

/**
 * @interface TrainerInput
 * @description Interface for creating a new trainer.
 *
 * @openapi
 * components:
 *   schemas:
 *     TrainerInput:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - region
 *         - team
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the new Pokémon trainer.
 *         age:
 *           type: number
 *           description: The age of the new trainer.
 *         region:
 *           type: string
 *           description: The region the new trainer belongs to.
 *         team:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of Pokémon names (IDs) in the new trainer's team.
 */
export interface TrainerInput {
	name: string;
	age: number;
	region: string;
	team: string[];
}

/**
 * @interface TrainerUpdate
 * @description Interface for updating an existing trainer.
 *
 * @openapi
 * components:
 *   schemas:
 *     TrainerUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The updated name of the trainer.
 *         age:
 *           type: number
 *           description: The updated age of the trainer.
 *         region:
 *           type: string
 *           description: The updated region the trainer belongs to.
 *         team:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of updated Pokémon names (IDs) in the trainer's team.
 */
export interface TrainerUpdate {
	name?: string;
	age?: number;
	region?: string;
	team?: string[];
}
