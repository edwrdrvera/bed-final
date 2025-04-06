import express, { Router } from "express";
import * as locationController from "../controllers/locationController";
import { validateRequest } from "../middleware/validate";
import {
	createLocationSchema,
	updateLocationSchema,
} from "../validation/locationValidation";

const router: Router = express.Router();

router.post(
	"/",
	validateRequest(createLocationSchema),
	locationController.createLocation
);

router.get("/", locationController.getAllLocations);

router.get("/:id", locationController.getLocationById);

router.put(
	"/:id",
	validateRequest(updateLocationSchema),
	locationController.updateLocation
);

router.delete("/:id", locationController.deleteLocation);

export default router;
