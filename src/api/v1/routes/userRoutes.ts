import express, { Router } from "express";
import { getUserProfile } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/** Route to get the user's profile. */
router.get(
	"/:uid",
	authenticate,
	isAuthorized({ hasRole: ["admin", "manager", "user", "officer"] }),
	getUserProfile
);

export default router;
