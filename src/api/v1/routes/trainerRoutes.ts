import express, { Router } from "express";
import * as trainerController from "../controllers/trainerController";
import { validateRequest } from "../middleware/validate";
import {
	createTrainerSchema,
	updateTrainerSchema,
} from "../validation/trainerValidation";

const router: Router = express.Router();

/**
 * @route POST /api/v1/trainers
 * @description Create a new trainer
 * @openapi
 * /api/v1/trainers:
 *   post:
 *     summary: Create a new trainer
 *     description: Create a new trainer with the provided data
 *     tags: [Trainers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerInput'
 *     responses:
 *       201:
 *         description: Trainer created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
	"/",
	validateRequest(createTrainerSchema),
	trainerController.createTrainer
);

/**
 * @route GET /api/v1/trainers
 * @description Get all trainers
 * @openapi
 * /api/v1/trainers:
 *   get:
 *     summary: Get all trainers
 *     description: Retrieve a list of all trainers
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: A list of trainers
 *       500:
 *         description: Server error
 */
router.get("/", trainerController.getAllTrainers);

/**
 * @route GET /api/v1/trainers/:id
 * @description Get a trainer by ID
 * @openapi
 * /api/v1/trainers/{id}:
 *   get:
 *     summary: Get a trainer by ID
 *     description: Retrieve details of a specific trainer by their ID
 *     tags: [Trainers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the trainer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trainer details found
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
router.get("/:id", trainerController.getTrainerById);

/**
 * @route PUT /api/v1/trainers/:id
 * @description Update a trainer by ID
 * @openapi
 * /api/v1/trainers/{id}:
 *   put:
 *     summary: Update a trainer by ID
 *     description: Update an existing trainer's details
 *     tags: [Trainers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the trainer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerUpdate'
 *     responses:
 *       200:
 *         description: Trainer updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Trainer not found
 */
router.put(
	"/:id",
	validateRequest(updateTrainerSchema),
	trainerController.updateTrainer
);

/**
 * @route DELETE /api/v1/trainers/:id
 * @description Delete a trainer by ID
 * @openapi
 * /api/v1/trainers/{id}:
 *   delete:
 *     summary: Delete a trainer by ID
 *     description: Delete a trainer by their ID
 *     tags: [Trainers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the trainer to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trainer deleted successfully
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", trainerController.deleteTrainer);

export default router;
