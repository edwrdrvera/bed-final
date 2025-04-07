import { Request, Response, NextFunction } from "express";
import * as sightingService from "../services/sightingService";
import { Sighting, SightingInput } from "../models/sightingModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

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
			req.body as SightingInput
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(updatedSighting, "Sighting Updated"));
	} catch (error) {
		next(error);
	}
};
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
