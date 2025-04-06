import { Request, Response, NextFunction } from "express";
import * as trainerService from "../services/trainerService";
import { Trainer, TrainerUpdate, TrainerInput } from "../models/trainerModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

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
