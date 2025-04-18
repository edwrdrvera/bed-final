import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as trainerService from "../services/trainerService";
import { TrainerUpdate } from "../models/trainerModel";

/**
 * Sets custom claims (like roles) for a Firebase user and updates the corresponding trainer record
 * with the user's UID. Requires admin privileges
 *
 * @param req - Incoming request object, containing `id`, `uid`, and `claims` in the body.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a success response or passes an error to the error handler.
 */
export const setCustomClaims = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { id, uid, claims } = req.body;

	try {
		trainerService.updateTrainer(id, {
			uid: uid,
		} as TrainerUpdate);

		await auth.setCustomUserClaims(uid, claims);

		res
			.status(HTTP_STATUS.OK)
			.send(successResponse({}, `Custom claims set for user: ${uid}`));
	} catch (error: unknown) {
		next(error);
	}
};
