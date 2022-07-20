import { User } from "db/entity";
import { Request, Response } from "express";
import {
  RequestParams,
  RequestWithBody,
  RequestWithParams,
} from "server/types";
import { validate } from "class-validator";
import { AppDataSource } from "db/data-source";

export class UserController {
  private static repository = AppDataSource.getRepository(User);

  public static async get(request: Request, response: Response<User[] | null>) {
    const users = await UserController.repository.find();

    response.send(users);
  }

  public static async getById(
    request: RequestWithParams<RequestParams>,
    response: Response<User | null>
  ) {
    const { id } = request.params;

    if (id && !isNaN(parseInt(id))) {
      const user = await UserController.repository.findOne({
        select: {
          username: true,
        },
        where: {
          id: parseInt(id),
        },
      });

      if (user) {
        response.send(user);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  }

  public static async create(
    request: RequestWithBody<User>,
    response: Response<User>
  ) {
    const userBody = request.body;

    const user = UserController.repository.create(userBody);
    const errors = await validate(user);
    console.log(errors);
    if (errors.length) {
      response.status(500).send();
    } else {
      const result = await UserController.repository.save(user);
      response.json(result);
    }
  }

  public static async delete(
    request: RequestWithParams<RequestParams>,
    response: Response<User | null>
  ) {
    const { id } = request.params;

    if (id && !isNaN(parseInt(id))) {
      const user = await UserController.repository.findOne({
        where: {
          id: parseInt(id),
        },
      });

      if (user) {
        await UserController.repository.remove(user);

        response.send(user);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.end();
    }
  }
}
