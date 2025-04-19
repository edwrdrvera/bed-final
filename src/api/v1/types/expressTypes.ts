import { Request, Response, NextFunction } from "express";

/**
 * Represents the structure of a middleware function in an Express application.
 *
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export type MiddlewareFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

/**
 * Generic type for the request body in Express.
 */
export type RequestBody = Record<string, unknown>;

/**
 * General type for the request data in Express.
 *
 * @template T - The type of the request body.
 * @property body - The parsed request body according to T.
 * @property params - Route parameters as key-value pairs.
 * @property query - Query containing the parsed query string parameters.
 */
export type RequestData<T extends RequestBody = RequestBody> = {
	body: T;
	params: Record<string, string>;
	query: Record<string, string | string[]>;
};
