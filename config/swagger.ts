import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import express from "express";
import path from "path";

import { generateSwaggerDocs } from "./swaggerOptions";

const swaggerDistPath: string = path.join(
	__dirname,
	"../node_modules/swagger-ui-dist"
);

const setupSwagger = (app: Express): void => {
	// Generate the Swagger specification object
	const swaggerDocs: object = generateSwaggerDocs();

	app.use(
		"/api-docs",
		// Serve main static files
		express.static(swaggerDistPath, { index: false }),
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocs)
	);
};

export default setupSwagger;
