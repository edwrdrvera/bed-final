import { Request, Response, NextFunction } from "express";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Controller to get the user profile.
 * @param req - Incoming request object.
 * @param res - Response object to send the user profile response.
 * @param next - Next middleware function.
 */
export const getUserProfile = (
	req: Request,
	res: Response,
	_next: NextFunction
): void => {
	const userId: string = res.locals.uid;
	const roles: string[] = res.locals.role;
	res
		.status(HTTP_STATUS.OK)
		.json(
			successResponse({ userId, roles }, `User profile for user ID: ${userId}`)
		);
};
