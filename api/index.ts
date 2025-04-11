// Entry point for the Vercel serverless function.
import app from "../src/server";

// Export the Express app instance as the default export.
// Vercel will take this handler and run it inside its environment.
export default app;
