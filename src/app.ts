import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json"; // Load static spec from root

dotenv.config();

import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";
import locationRoutes from "./api/v1/routes/locationRoutes";
import trainerRoutes from "./api/v1/routes/trainerRoutes";
import sightingRoutes from "./api/v1/routes/sightingRoutes";

const app: Express = express();

setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicFolderPath: string = path.join(__dirname, "./public");
app.use("/public", express.static(publicFolderPath));

const swaggerDistPath: string = path.join(
	__dirname,
	"../node_modules/swagger-ui-dist"
);

// Define options for Swagger UI setup
const swaggerOptions: object = {
	customCssUrl: "/public/swagger-ui.css",
	customSiteTitle: "PokeLog API Docs",
};

app.use(
	"/api-docs",
	// Serve main static files
	express.static(swaggerDistPath, { index: false }),
	// Serve CSS files from the public folder
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, swaggerOptions)
);

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
