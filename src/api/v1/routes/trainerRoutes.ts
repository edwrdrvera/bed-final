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
 *
 * @openapi
 * /api/v1/trainers:
 *   post:
 */
router.post(
	"/",
	validateRequest(createTrainerSchema),
	trainerController.createTrainer
);

/**
 * @route GET /api/v1/trainers
 * @description Get all trainers
 *
 * @openapi
 * /api/v1/trainers:
 *   get:
 */
router.get("/", trainerController.getAllTrainers);

/**
 * @route GET /api/v1/trainers/:id
 * @description Get a trainer by ID
 *
 * @openapi
 * /api/v1/trainers/{id}:
 *   get:
 */
router.get("/:id", trainerController.getTrainerById);

/**
 * @route PUT /api/v1/trainers/:id
 * @description Update a trainer by ID
 *
 * @openapi
 * /api/v1/trainers/{id}:
 *   put:
 */
router.put(
	"/:id",
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
 */
router.delete("/:id", trainerController.deleteTrainer);

export default router;
