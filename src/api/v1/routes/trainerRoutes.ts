import express, { Router } from "express";
import * as trainerController from "../controllers/trainerController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerInput'
 *     responses:
 *       "201":
 *         description: Trainer created successfully
 *       "400":
 *         description: Bad request due to invalid data
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user is not authorized to create a trainer
 *       "404":
 *         description: Not Found - The specified trainer does not exist
 *       "500":
 *         description: Internal server error
 */
router.post(
	"/",
	authenticate,
	isAuthorized({ hasRole: ["admin", "manager"] }),
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: A list of trainers
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user does not have the required role
 *       "404":
 *         description: Not Found - The specified trainer does not exist
 *       "500":
 *         description: Internal Server Error
 */
router.get(
	"/",
	authenticate,
	isAuthorized({ hasRole: ["admin", "manager", "user"] }),
	trainerController.getAllTrainers
);

/**
 * @route GET /api/v1/trainers/:id
 * @description Get a trainer by ID
 * @openapi
 * /api/v1/trainers/{id}:
 *   get:
 *     summary: Get a trainer by ID
 *     description: Retrieve details of a specific trainer by their ID
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the trainer to retrieve
 *         example: "trainer-123"
 *     responses:
 *       "200":
 *         description: Trainer details found
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user does not have the required role
 *       "404":
 *         description: Not Found - Trainer with specified ID does not exist.
 *       "500":
 *         description: Internal Server Error
 */
router.get(
	"/:id",
	authenticate,
	isAuthorized({ hasRole: ["admin", "manager", "user"] }),
	trainerController.getTrainerById
);

/**
 * @route PUT /api/v1/trainers/:id
 * @description Update a trainer by ID
 * @openapi
 * /api/v1/trainers/{id}:
 *   put:
 *     summary: Update a trainer by ID
 *     description: Update an existing trainer's details
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trainer to update
 *         example: "trainer-123"
 *     requestBody:
 *       required: true
 *       description: Data to update for the trainer.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerUpdate'
 *     responses:
 *       "200":
 *         description: Trainer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       "400":
 *         description: Bad request due to invalid data
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user is not authorized to update the trainer
 *       "404":
 *         description: Not Found - Trainer with specified ID does not exist
 *       "500":
 *         description: Internal server error
 */
router.put(
	"/:id",
	authenticate,
	isAuthorized({ hasRole: ["admin", "manager"] }),
	validateRequest(updateTrainerSchema),
	trainerController.updateTrainer
);

/**
 * @route DELETE /api/v1/trainers/:id
 * @description Delete a trainer by ID
 *
 * @openapi
 * /api/v1/trainers/{id}:
 *   delete:
 *     summary: Delete a trainer by ID
 *     description: Permanently remove a trainer from the database.
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trainer to delete
 *         example: "trainer-123"
 *     responses:
 *       "200":
 *         description: Trainer deleted successfully
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user is not authorized to delete the trainer
 *       "404":
 *         description: Not Found - Trainer with specified ID does not exist
 *       "500":
 *         description: Internal server error
 */
router.delete(
	"/:id",
	authenticate,
	isAuthorized({ hasRole: ["admin"] }),
	trainerController.deleteTrainer
);

export default router;
