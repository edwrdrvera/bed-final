import express, { Router } from "express";
import * as sightingController from "../controllers/sightingController";

const router: Router = express.Router();

/**
 * @route POST /api/v1/sightings
 * @description Create a new sighting
 *
 * @openapi
 * /api/v1/sightings:
 *   post:
 *     summary: Create a new sighting
 *     description: Create a new Pokémon sighting with the provided details.
 *     tags: [Sightings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SightingInput'
 *     responses:
 *       201:
 *         description: Sighting created successfully
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
 *                   example: Sighting created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Sighting'
 *       400:
 *         description: Bad request due to invalid data
 *       500:
 *         description: Internal server error
 */
router.post("/", sightingController.createSighting);

/**
 * @route GET /api/v1/sightings
 * @description Get all sightings
 *
 * @openapi
 * /api/v1/sightings:
 *   get:
 *     summary: Get all sightings
 *     description: Retrieve a list of all Pokémon sightings stored in the system.
 *     tags: [Sightings]
 *     responses:
 *       200:
 *         description: A list of all sightings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sighting'
 *       500:
 *         description: Internal server error
 */
router.get("/", sightingController.getAllSightings);

/**
 * @route GET /api/v1/sightings/:id
 * @description Get a sighting by ID
 *
 * @openapi
 * /api/v1/sightings/{id}:
 *   get:
 *     summary: Get a sighting by ID
 *     description: Retrieve a specific sighting by its ID.
 *     tags: [Sightings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the sighting to retrieve.
 *     responses:
 *       200:
 *         description: A sighting with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sighting'
 *       404:
 *         description: Sighting not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", sightingController.getSightingById);

/**
 * @route PUT /api/v1/sightings/:id
 * @description Update a sighting by ID
 *
 * @openapi
 * /api/v1/sightings/{id}:
 *   put:
 *     summary: Update a sighting by ID
 *     description: Update the details of an existing sighting by its ID.
 *     tags: [Sightings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the sighting to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SightingUpdate'
 *     responses:
 *       200:
 *         description: Sighting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sighting'
 *       400:
 *         description: Bad request due to invalid input
 *       404:
 *         description: Sighting not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", sightingController.updateSighting);

/**
 * @route DELETE /api/v1/sightings/:id
 * @description Delete a sighting by ID
 *
 * @openapi
 * /api/v1/sightings/{id}:
 *   delete:
 *     summary: Delete a sighting by ID
 *     description: Delete a specific sighting by its ID.
 *     tags: [Sightings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the sighting to delete.
 *     responses:
 *       200:
 *         description: Sighting deleted successfully
 *       404:
 *         description: Sighting not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", sightingController.deleteSighting);

export default router;
