import { Request, Response } from "express";
import { UserService } from "../services/userService";
export class UserController {
  constructor(private userService: UserService) {}

  getAllSubCon = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getAllSubCon();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  };
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const getUsers = await this.userService.getAllUsers();
      res.status(200).json(getUsers);
    } catch (e) {
      res.status(401).json({ Message: "Unsuccessful" });
    }
  };
  updateUserLayer = async (req: Request, res: Response) => {
    try {
      const { userLayer, userId } = req.body;

      const updateUserLayer = await this.userService.updateUserLayer(
        userLayer,
        userId
      );
      res.status(200).json(updateUserLayer);
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };
}
