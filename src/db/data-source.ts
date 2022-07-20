import { DataSource } from "typeorm";
import { Author, AuthToken, Photo, PhotoMetadata, User } from "./entity";
import { extractStringFromEnv } from "utils/env";
import { Album } from "./entity/Album";
import dotenv from "dotenv";

dotenv.config();

const DB_USERNAME = extractStringFromEnv("DB_USERNAME");
const DB_PASSWORD = extractStringFromEnv("DB_PASSWORD");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: "postgres",
  migrations: ["src/db/migration/**/*.ts"],
  entities: [Photo, PhotoMetadata, Author, Album, User, AuthToken],
  synchronize: false,
  logging: "all",
});
