import "reflect-metadata";
import { initServer } from "server";

import { initDB } from "db";

const start = async (): Promise<void> => {
  await initDB();
  await initServer();
  await test();
};

start();

const test = async (): Promise<void> => {};
