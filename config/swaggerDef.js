if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const serverUrl =
	process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

module.exports = {
	openapi: "3.0.0",
	info: {
		title: "Location, Pokemon, Sightings Management API Documentation",
		version: "1.0.0",
		description: "This is the API documentation for the applciation.",
	},
	servers: [
		{
			url: serverUrl,
			description:
				process.env.NODE_ENV === "production"
					? "Production Server"
					: "Local Server",
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
};
