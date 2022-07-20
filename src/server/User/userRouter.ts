import { Router } from "express";
import { UserController } from "./UserController";

export const userRouter = Router();

userRouter.route("/users").get(UserController.get).post(UserController.create);

userRouter
  .route("/users/:id")
  .get(UserController.getById)
  .delete(UserController.delete);

userRouter.post("/authenticate", UserController.authenticate);
