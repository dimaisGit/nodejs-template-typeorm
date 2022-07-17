import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { extractNumberFromEnv } from "./utils/env";

dotenv.config();

const port = extractNumberFromEnv("PORT");

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
