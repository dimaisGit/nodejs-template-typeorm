import { AppDataSource } from "./data-source";

export const initDB = async (): Promise<void> => {
  console.log("initializing database");
  try {
    await AppDataSource.initialize();
  } catch (e) {
    console.log(e);

    process.exit(1);
  }
};
