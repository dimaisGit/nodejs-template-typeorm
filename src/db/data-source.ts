import { DataSource } from "typeorm";
import { Photo } from "./entity";
import { extractStringFromEnv } from "../utils/env";

const DB_USERNAME = extractStringFromEnv("DB_USERNAME");
const DB_PASSWORD = extractStringFromEnv("DB_PASSWORD");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: "postgres",
  entities: [Photo],
  synchronize: true,
  logging: false,
});
