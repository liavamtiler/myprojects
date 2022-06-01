import { Request, Response, NextFunction } from "express";

export const isLoggedInStatic = (req: Request, res: Response, next: NextFunction) => {
  if (req.session["user"]) {
    return next();
  }

  res.redirect("/login.html");
};

export const isLoggedInApi = (req: Request, res: Response, next: NextFunction) => {
  if (req.session["user"]) {
    next();
    return;
  }

  res.status(401).json({ message: "Unauthorized" });
};
