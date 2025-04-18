import { Request, Response, NextFunction } from "express";
import * as trainerService from "../services/trainerService";
import { Trainer, TrainerUpdate } from "../models/trainerModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 *  Handles the creation of a new trainer.
 *
 * @param req - Incoming request object, containing the trainer data in the body.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with an array of locations
 *                          or passes an error
 */
export const createTrainer = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const newTrainer: Trainer = await trainerService.createTrainer(req.body);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(newTrainer, "Trainer Created"));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the retrieval of all trainers.
 *
 * @param req - Incoming request object.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with an array of all
 *                          trainers or passes an error to the error handler.
 */
export const getAllTrainers = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const trainers: Trainer[] = await trainerService.getAllTrainers();
		res.status(HTTP_STATUS.OK).json(successResponse(trainers));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the retrieval of a trainer by its ID.
 *
 * @param req - Incoming request object, containing the trainer ID in the URL
 *              parameters.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with the trainer data or
 *                          passes an error to the error handler.
 */
export const getTrainerById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const trainerId: string = req.params.id;
		const trainer: Trainer = await trainerService.getTrainerById(trainerId);
		res.status(HTTP_STATUS.OK).json(successResponse(trainer, "Trainer Found"));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the update of a trainer by its ID.
 *
 * @param req - Incoming request object, containing the trainer ID in the URL
 *              parameters and the updated trainer data in the body.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response with the updated trainer data
 *                          or passes an error to the error handler.
 */
export const updateTrainer = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const trainerId: string = req.params.id;
		const updatedTrainer: Trainer = await trainerService.updateTrainer(
			trainerId,
			req.body as TrainerUpdate
		);
		res
			.status(HTTP_STATUS.OK)
			.json(successResponse(updatedTrainer, "Trainer Updated"));
	} catch (error) {
		next(error);
	}
};

/**
 *  Handles the deletion of a trainer by its ID.
 *
 * @param req - Incoming request object, containing the trainer ID in the URL
 *              parameters.
 * @param res - Response object.
 * @param next - Next middleware function.
 * @returns Promise<void> - Sends a JSON response indicating the trainer has been
 *                          deleted or passes an error to the error handler.
 */
export const deleteTrainer = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const trainerId: string = req.params.id;
		await trainerService.deleteTrainer(trainerId);
		res.status(HTTP_STATUS.OK).json(successResponse(null, "Trainer Deleted"));
	} catch (error) {
		next(error);
	}
};
