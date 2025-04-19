import { Request, Response, NextFunction } from "express";
import * as locationService from "../services/locationService";
import { Location, LocationUpdate } from "../models/locationModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 *  Creates a new location and sends a success response.
 *
 * @param req - Incoming request object, containing the location data in the body.
 * @param res  - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a success response or passes an error to the
 *                          error handler.
 */
export const createLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const newLocation: Location = await locationService.createLocation(
			req.body
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(newLocation, "Location Created"));
	} catch (error) {
		next(error);
	}
};

/**
 * Handles the retrieval of all locations.
 *
 * @param req - Incoming request object.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with an array of all
 *                          locations or passes an error to the error handler.
 */
export const getAllLocations = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const locations: Location[] = await locationService.getAllLocations();
		res.status(HTTP_STATUS.OK).json(successResponse(locations));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the retrieval of a location by its ID.
 *
 * @param req - Incoming request object, containing the location ID in the URL
 *              parameters.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with the location data or
 *                          passes an error to the error handler.
 */
export const getLocationById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const locationId: string = req.params.id;
		const location: Location = await locationService.getLocationById(
			locationId
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(location, "Location Found"));
	} catch (error) {
		next(error);
	}
};

/**
 * Handles the update of a location by its ID.
 *
 * @param req - Incoming request object, containing the location ID in the URL
 *              parameters and the updated data in the body.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with the updated location data
 *                          or passes an error to the error handler.
 */
export const updateLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const updateData: LocationUpdate = {};

		if (req.body.addressName) {
			updateData.addressName = req.body.addressName;
		}
		if (req.body.terrain) {
			updateData.terrain = req.body.terrain;
		}
		if (req.body.pokemon) {
			updateData.pokemon = req.body.pokemon;
		}

		const updatedLocation: Location = await locationService.updateLocation(
			req.params.id,
			updateData
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(updatedLocation, "Location Updated"));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the deletion of a location by its ID.
 * @param req - Incoming request object, containing the location ID in the URL
 *              parameters.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response indicating the deletion status
 *                          or passes an error to the error handler.
 */
export const deleteLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		await locationService.deleteLocation(req.params.id);
		res.status(HTTP_STATUS.OK).json(successResponse(null, "Location Deleted"));
	} catch (error) {
		next(error);
	}
};
