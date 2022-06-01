import { Request, Response } from "express";
import jwt from "../utils/jwt";
import jwtSimple from "jwt-simple";
import { UserService } from "../services/userService";
import { checkPassword, hashPassword } from "../utils/hash";
import { InvalidLoginError } from "../utils/errors";
import { loginSchema } from "../validatation/user";
import { logger } from "../utils/logger";
export class AuthController {
  constructor(private userService: UserService) {}

  signUpNewUser = async (req: Request, res: Response) => {
    logger.info("[Debug], signUpNewUser is triggered");
    try {
      const { username, password, email, company } = req.body;
      const hashedPassword = await hashPassword({ password }.password);
      const result = await this.userService.signUpRequest(
        username,
        hashedPassword,
        email,
        company
      );

      if (result == "false") {
        res.status(401).json({ Message: "USER HAS ALREADY EXISTED" });
        return;
      }
      res.status(200).json({ result: "SUCCESSFULLY SIGN UP" });
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  };

  /* Auth Login User */

  login = async (req: Request, res: Response) => {
    try {
      const loginInput = loginSchema.validate(req.body);

      /* [DUBUG] */

      const user = (
        await this.userService.getUserByUserName(loginInput.value.username)
      )[0];

      if (
        !user ||
        !(await checkPassword(loginInput.value.password, user["password"]))
      ) {
        throw new InvalidLoginError();
      }
      const payload = {
        id: user.id,
        username: user.username,
      };

      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      res.json({ token: token, user_layer_name: user.user_layer_name });
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    try {
      res.json({ ...req.user });
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  };
}
