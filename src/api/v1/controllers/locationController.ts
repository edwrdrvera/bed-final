import { Request, Response, NextFunction } from "express";
import * as locationService from "../services/locationService";
import { Location, LocationUpdate } from "../models/locationModel";

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
		res.status(201).json(newLocation);
	} catch (error) {
		console.error("Error in createLocation controller:", error);
		res.status(500).json({
			message: "Internal server error occurred while creating location.",
		});
	}
};

export const getAllLocations = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const locations: Location[] = await locationService.getAllLocations();
		res.status(200).json(locations);
	} catch (error) {
		console.error("Error in getAllLocations controller:", error);
		res.status(500).json({
			message: "Internal server error occurred while fetching locations.",
		});
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
		if (location) {
			res.status(200).json(location);
		} else {
			res.status(404).json({
				message: `Location with ID '${locationId}' not found.`,
			});
		}
	} catch (error) {
		console.error("Error in getLocationById controller:", error);
		res.status(500).json({
			message: "Internal server error occurred while fetching location.",
		});
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

		if (updatedLocation) {
			res.status(200).json(updatedLocation);
		}
	} catch (error) {
		console.error("Error in updateLocation controller:", error);
		res.status(500).json({
			message: "Internal server error occurred while updating location.",
		});
	}
};

export const deleteLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const locationId: string = req.params.id;
		await locationService.deleteLocation(locationId);
		res.status(204).send();
	} catch (error) {
		console.error("Error in deleteLocation controller:", error);
		res.status(500).json({
			message: "Internal server error occurred while deleting location.",
		});
	}
};
