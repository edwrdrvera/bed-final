import swaggerUi from "swagger-ui-express";
// import swagger ui middleware
import { Express } from "express";
import { generateSwaggerDocs } from "./swaggerOptions";

// serve swagger in apiDocs directory
const setupSwagger = (app: Express): void => {
	const swaggerDocs: object = generateSwaggerDocs();
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

// export swagger endpoint for Express app
export default setupSwagger;
