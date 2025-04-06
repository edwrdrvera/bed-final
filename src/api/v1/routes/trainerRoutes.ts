import express, { Router } from "express";
import * as trainerController from "../controllers/trainerController";
import { validateRequest } from "../middleware/validate";
import {
	createTrainerSchema,
	updateTrainerSchema,
} from "../validation/trainerValidation";

const router: Router = express.Router();

router.post(
	"/",
	validateRequest(createTrainerSchema),
	trainerController.createTrainer
);
router.get("/", trainerController.getAllTrainers);
router.get("/:id", trainerController.getTrainerById);
router.put(
	"/:id",
	validateRequest(updateTrainerSchema),
	trainerController.updateTrainer
);
router.delete("/:id", trainerController.deleteTrainer);

export default router;
