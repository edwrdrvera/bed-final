import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import locationRoutes from "./api/v1/routes/locationRoutes";

// Initialize Express application
const app: Express = express();
app.use(express.json());

// Define a route
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

export default app;
