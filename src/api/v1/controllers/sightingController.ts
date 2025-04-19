import { Request, Response, NextFunction } from "express";
import * as sightingService from "../services/sightingService";
import { Sighting, SightingUpdate } from "../models/sightingModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 *  Handles the creation of a new sighting.
 *
 * @param req - Incoming request object, containing the sighting data in the
 *              body.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a success response or passes an error to the
 *                          error handler.
 */
export const createSighting = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const newSighting: Sighting = await sightingService.createSighting(
			req.body
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(newSighting, "Sighting Created"));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the retrieval of all sightings.
 *
 * @param req - Incoming request object.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with an array of all
 *                          sightings or passes an error to the error handler.
 */
export const getAllSightings = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const sightings: Sighting[] = await sightingService.getAllSightings();
		res.status(HTTP_STATUS.OK).json(successResponse(sightings));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the retrieval of a sighting by its ID.
 *
 * @param req - Incoming request object, containing the sighting ID in the URL
 *              parameters.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with the sighting data or
 *                          passes an error to the error handler.
 */
export const getSightingById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const sightingId: string = req.params.id;
		const sighting: Sighting = await sightingService.getSightingById(
			sightingId
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(sighting, "Sighting Found"));
	} catch (error) {
		next(error);
	}
};

export const updateSighting = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const sightingId: string = req.params.id;
		const updatedSighting: Sighting = await sightingService.updateSighting(
			sightingId,
			req.body as SightingUpdate
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(updatedSighting, "Sighting Updated"));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the deletion of a sighting by its ID.
 *
 * @param req - Incoming request object, containing the sighting ID in the URL
 *              parameters.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a success response or passes an error to the
 *                          error handler.
 */
export const deleteSighting = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const sightingId: string = req.params.id;
		await sightingService.deleteSighting(sightingId);
		res.status(HTTP_STATUS.OK).json(successResponse(null, "Sighting Deleted"));
	} catch (error) {
		next(error);
	}
};
