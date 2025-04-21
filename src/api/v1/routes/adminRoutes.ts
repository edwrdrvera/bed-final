import express, { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @route POST /api/v1/admin/setCustomClaims
 * @description Set custom claims (roles) for a Firebase user. Requires admin privileges.
 *
 * @openapi
 * /api/v1/admin/setCustomClaims:
 *   post:
 *     summary: Set custom claims for a user
 *     description: Allows an administrator to set custom claims for a Firebase user.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               id
 *               uid
 *               claims
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the trainer to whom the claims will be assigned.
 *                 example: "trainer-123"
 *               uid:
 *                 type: string
 *                 description: The Firebase UID of the user whose claims are to be set.
 *                 example: "exampleUID"
 *               claims:
 *                 type: object
 *                 description: An object containing the custom claims to set. Typically includes a 'role'.
 *                 example: { "role": "manager" }
 *                 properties:
 *                   role:
 *                     type: string
 *                     description: The role to assign to the user.
 *     responses:
 *       "200":
 *         description: Custom claims set successfully.
 *       "400":
 *         description: Bad Request - Invalid input data (e.g., missing uid or claims).
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       "403":
 *         description: Forbidden - The authenticated user is not an administrator.
 *       "404":
 *         description: Not Found - The user specified by the UID does not exist.
 *       "500":
 *         description: Internal Server Error
 */
router.post(
	"/setCustomClaims",
	authenticate,
	isAuthorized({ hasRole: ["admin"] }),
	setCustomClaims
);

export default router;
