import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { extractStringFromEnv } from "utils/env";
import { TOKEN_LIFESPAN } from "./constants";
import { JWTPayload } from "./types";

dotenv.config();

const JWT_PRIVATE_KEY = extractStringFromEnv("JWT_PRIVATE_KEY");

export const createJWT = (incomePayload: JWTPayload): Promise<string> =>
  new Promise((resolve, reject) => {
    const payload = {
      exp: TOKEN_LIFESPAN,
      createdAt: Date.now(),
      ...incomePayload,
    };
    JWT.sign(payload, JWT_PRIVATE_KEY, (err, token) => {
      if (err) reject(err);

      if (token) resolve(token);
    });
  });
