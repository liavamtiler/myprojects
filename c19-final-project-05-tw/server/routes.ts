import express from "express";
import { projectRouters } from "./routers/projectRouter";

export const routes = express.Router();

routes.use((req, res, next) => {
  console.log(`[DEBUG] request method: ${req.method} path: ${req.path}`);

  next();
});

routes.use("/project", projectRouters);

routes.get("test", (req, res) => {
  res.json({ message: "test" });
});
