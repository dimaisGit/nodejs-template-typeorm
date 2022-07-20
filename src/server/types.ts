import { Request } from "express";

export type RequestParams = {
  id?: string;
};

export type RequestWithParams<Params> = Request<Params>;

export type RequestWithQueryParams<QueryParams> = Request<
  unknown,
  unknown,
  unknown,
  QueryParams
>;

export type RequestWithBody<Body> = Request<unknown, unknown, Body>;
