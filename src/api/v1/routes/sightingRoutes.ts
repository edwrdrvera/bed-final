import express, { Router } from "express";
import * as sightingController from "../controllers/sightingController";

const router: Router = express.Router();

router.post("/", sightingController.createSighting);
router.get("/", sightingController.getAllSightings);
router.get("/:id", sightingController.getSightingById);
router.put("/:id", sightingController.updateSighting);
router.delete("/:id", sightingController.deleteSighting);

export default router;
