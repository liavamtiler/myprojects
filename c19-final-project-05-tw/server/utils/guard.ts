import { NextFunction, Request, Response } from "express";
import { Bearer } from "permit";
import { UserService } from "../services/userService";
import jwtSimple from "jwt-simple";
import jwt from "./jwt";
import { User } from "../models";

declare global {
  namespace Express {
    interface Request {
      user: Omit<User, "password">;
    }
  }
}

/*JWT Guard*/
export const createIsLoggedIn = (permit: Bearer, userService: UserService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = permit.check(req);
      if (!token) {
        res.status(401).json({ error: "PERMISSION DENIED" });
        return;
      }

      const payload = jwtSimple.decode(token, jwt.jwtSecret);
      const user = await userService.getUserById(payload.id);

      if (!user) {
        return res.status(401).json({ error: "PERMISSION DENIED" });
      }

      const { password, ...others } = user;
      req.user = others;
      next();
      return;
    } catch (e) {
      return res.status(401).json({ error: "PERMISSION DENIED" });
    }
  };
};
