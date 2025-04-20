import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";
import locationRoutes from "./api/v1/routes/locationRoutes";
import trainerRoutes from "./api/v1/routes/trainerRoutes";
import sightingRoutes from "./api/v1/routes/sightingRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

const app: Express = express();

setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicFolderPath: string = path.join(__dirname, "./public");
app.use("/public", express.static(publicFolderPath));

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.get("/api/v1/health", (req, res) => {
	res.json({
		status: "OK",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
		version: "1.0.0",
	});
});

app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/trainers", trainerRoutes);
app.use("/api/v1/sightings", sightingRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

export default app;
