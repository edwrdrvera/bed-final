import express, { Router } from "express";
import * as locationController from "../controllers/locationController";
import { validateRequest } from "../middleware/validate";
import {
	createLocationSchema,
	updateLocationSchema,
} from "../validation/locationValidation";

const router: Router = express.Router();

/**
 * @route POST /api/v1/locations
 * @description Create a new location
 *
 * @openapi
 * /api/v1/locations:
 *   post:
 *     summary: Create a new location
 *     description: Create a new location with the provided details.
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationInput'
 *     responses:
 *       201:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Location created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Location'
 *       400:
 *         description: Bad request due to invalid data
 *       500:
 *         description: Internal server error
 */
router.post(
	"/",
	validateRequest(createLocationSchema),
	locationController.createLocation
);

/**
 * @route GET /api/v1/locations
 * @description Get all locations
 *
 * @openapi
 * /api/v1/locations:
 *   get:
 *     summary: Get all locations
 *     description: Retrieve a list of all locations stored in the system.
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Internal server error
 */
router.get("/", locationController.getAllLocations);

/**
 * @route GET /api/v1/locations/:id
 * @description Get a location by ID
 *
 * @openapi
 * /api/v1/locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     description: Retrieve a specific location by its ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the location to retrieve.
 *     responses:
 *       200:
 *         description: A location with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", locationController.getLocationById);

/**
 * @route PUT /api/v1/locations/:id
 * @description Update a location by ID
 *
 * @openapi
 * /api/v1/locations/{id}:
 *   put:
 *     summary: Update a location by ID
 *     description: Update the details of an existing location by its ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the location to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationUpdate'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Bad request due to invalid input
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.put(
	"/:id",
	validateRequest(updateLocationSchema),
	locationController.updateLocation
);

/**
 * @route DELETE /api/v1/locations/:id
 * @description Delete a location by ID
 *
 * @openapi
 * /api/v1/locations/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     description: Delete a specific location by its ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the location to delete.
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", locationController.deleteLocation);

export default router;
