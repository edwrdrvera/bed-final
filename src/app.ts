import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import errorHandler from "./api/v1/middleware/errorHandler";
import locationRoutes from "./api/v1/routes/locationRoutes";
import trainerRoutes from "./api/v1/routes/trainerRoutes";
import sightingRoutes from "./api/v1/routes/sightingRoutes";

// Initialize Express application
const app: Express = express();
app.use(express.json());

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

app.use(errorHandler);

export default app;
