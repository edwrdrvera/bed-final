import { Request, Response, NextFunction } from "express";
import * as locationService from "../services/locationService";
import { Location, LocationUpdate } from "../models/locationModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

export const createLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log(req.body);
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
