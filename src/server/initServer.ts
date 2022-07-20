import express, { Express } from "express";

import cors from "cors";

import dotenv from "dotenv";

import helmet from "helmet";
import { extractNumberFromEnv } from "utils/env";
import { notFoundMiddleware } from "./middleware/errors";
import { userRouter } from "./User";

dotenv.config();

export const initServer = (): Promise<void> =>
  new Promise((resolve) => {
    {
      console.log("starting server");
      const PORT = extractNumberFromEnv("PORT");

      const app: Express = express();

      app.use(cors());
      app.use(express.json());
      app.use(helmet());

      app.use(userRouter);

      app.use(notFoundMiddleware);

      app.listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
        resolve();
      });
    }
  });
