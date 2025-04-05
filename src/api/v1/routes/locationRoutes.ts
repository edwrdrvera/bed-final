import express, { Router } from "express";
import * as locationController from "../controllers/locationController";

const router: Router = express.Router();

router.post("/", locationController.createLocation);

router.get("/", locationController.getAllLocations);

router.get("/:id", locationController.getLocationById);

export default router;
