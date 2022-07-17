import express, { Express } from "express";

import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import helmet from "helmet";

import "reflect-metadata";

import { extractNumberFromEnv } from "utils/env";
import { AppDataSource } from "db";

const initDB = async (): Promise<void> => {
  console.log("initializing database");
  try {
    await AppDataSource.initialize();
  } catch (e) {
    console.log(e);

    process.exit(1);
  }
};

const initServer = (): void => {
  console.log("starting server");
  const PORT = extractNumberFromEnv("PORT");

  const app: Express = express();

  app.use(cors());
  app.use(express.json());
  app.use(helmet());

  app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
  });
};

const start = async (): Promise<void> => {
  await initDB();
  initServer();
};

start();
