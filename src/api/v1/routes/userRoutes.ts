import express, { Router } from "express";
import { getUserProfile } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @route GET /api/v1/users/:uid
 * @description Get user profile by UID
 *
 * @openapi
 * /api/v1/users/{uid}:
 *   get:
 *     summary: Get user profile by UID
 *     description: Retrieve the profile of a user by their UID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The UID of the user whose profile is to be retrieved.
 *         example: "exampleUID"
 *     responses:
 *       "200":
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The Firebase UID of the user.
 *                       example: "exampleUID"
 *                     roles:
 *                       type: string
 *                       description: The role assigned to the user.
 *                       example: "admin"
 *                 message:
 *                   type: string
 *                   example: "User profile for user ID: exampleUID"
 *       "401":
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       "403":
 *         description: Forbidden - The authenticated user does not have the required role.
 *       "404":
 *         description: Not Found - The user specified by the UID does not exist.
 *       "500":
 *         description: Internal Server Error
 */
router.get(
	"/:uid",
	authenticate,
	isAuthorized({ hasRole: ["admin", "manager", "user", "officer"] }),
	getUserProfile
);

export default router;
