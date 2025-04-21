import express, { Router } from "express";
import * as locationController from "../controllers/locationController";
import { validateRequest } from "../middleware/validate";
import {
	createLocationSchema,
	updateLocationSchema,
} from "../validation/locationValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Location details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LocationInput"
 *     responses:
 *       "201":
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
 *                   $ref: "#/components/schemas/Location"
 *       "400":
 *         description: Bad request due to invalid data
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user is not authorized to create a location
 *       "404":
 *         description: Not Found - The specified location does not exist
 *       "500":
 *         description: Internal server error
 */
router.post(
	"/",
	authenticate,
	isAuthorized({ hasRole: ["admin", "officer", "manager"] }),
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
 *     description: Retrieves a list of all locations stored in the system.
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: A list of all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Location"
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user does not have the required role
 *       "500":
 *         description: Internal server error
 */
router.get(
	"/",
	authenticate,
	isAuthorized({ hasRole: ["admin", "officer", "manager", "user"] }),
	locationController.getAllLocations
);

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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the location to retrieve.
 *         example: "location-12345"
 *     responses:
 *       "200":
 *         description: A location with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Location"
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user does not have the required role
 *       "404":
 *         description: Location not found - The specified location does not exist
 *       "500":
 *         description: Internal server error
 */
router.get(
	"/:id",
	authenticate,
	isAuthorized({ hasRole: ["admin", "officer", "manager"] }),
	locationController.getLocationById
);

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
 *     security:
 *       - bearerAuth: []
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
 *             $ref: "#/components/schemas/LocationUpdate"
 *     responses:
 *       "200":
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Location"
 *       "400":
 *         description: Bad Request- Invalid input data
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user does not have the required role
 *       "404":
 *         description: Location not found
 *       "500":
 *         description: Internal server error
 */
router.put(
	"/:id",
	authenticate,
	isAuthorized({ hasRole: ["admin", "officer", "manager"] }),
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the location to delete.
 *     responses:
 *       "200":
 *         description: Location deleted successfully
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid
 *       "403":
 *         description: Forbidden - The authenticated user does not have the required role
 *       "404":
 *         description: Location not found -
 *       "500":
 *         description: Internal server error
 */
router.delete(
	"/:id",
	authenticate,
	isAuthorized({ hasRole: ["admin", "officer", "manager"] }),
	locationController.deleteLocation
);

export default router;
