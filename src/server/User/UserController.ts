import { AuthToken, User } from "db/entity";
import { Request, Response } from "express";
import {
  RequestParams,
  RequestWithBody,
  RequestWithParams,
} from "server/types";
import { validate } from "class-validator";
import { AppDataSource } from "db/data-source";
import {
  comparePasswords,
  createJWT,
  encryptPassword,
} from "server/utils/authentication";

export class UserController {
  private static repository = AppDataSource.getRepository(User);

  public static async get(request: Request, response: Response<User[] | null>) {
    const users = await UserController.repository.find({
      select: {
        username: true,
        authTokens: true,
      },
      relations: {
        authTokens: true,
      },
    });

    response.send(users);
  }

  public static async getById(
    request: RequestWithParams<RequestParams>,
    response: Response<User | null>
  ): Promise<void> {
    const { id } = request.params;

    if (id && !isNaN(parseInt(id))) {
      const user = await UserController.repository.findOne({
        select: {
          username: true,
          id: true,
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
  ): Promise<void> {
    const userBody = request.body;

    const user = UserController.repository.create(userBody);
    const errors = await validate(user);

    console.log(errors);
    if (errors.length) {
      response.status(500).send();
    } else {
      const { password } = user;

      const encryptedPassword: string = await encryptPassword(password);
      user.password = encryptedPassword;

      const result = await UserController.repository.save(user);
      response.json(result);
    }
  }

  public static async delete(
    request: RequestWithParams<RequestParams>,
    response: Response<User | null>
  ): Promise<void> {
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

  public static async authenticate(
    request: RequestWithBody<User>,
    response: Response<string>
  ): Promise<void> {
    const { username, password } = request.body;

    if (!username && !password) {
      response.sendStatus(500);
    } else {
      const user = await UserController.repository.findOne({
        where: {
          username,
        },
      });

      if (user) {
        const isPasswordsEqual = await comparePasswords(
          password,
          user.password
        );

        if (isPasswordsEqual) {
          const token = await createJWT({
            id: user.id,
          });

          const authTokenRepository = AppDataSource.getRepository(AuthToken);

          const authToken = authTokenRepository.create({
            token,
            user: user,
          });
          await authTokenRepository.save(authToken);

          response.send(token);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    }
  }
}
