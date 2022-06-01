import cors from "cors";
import { logger } from "./utils/logger";

import dotenv from "dotenv";
import Knex from "knex";

import { AuthController } from "./controllers/authController";
import { UserService } from "./services/userService";
import express from "express";
import { Bearer } from "permit";
import { createIsLoggedIn } from "./utils/guard";
import { CheckListService } from "./services/checkListService";
import { CheckListController } from "./controllers/checkListController";
import monitorManager from "./monitor";

import multer from "multer";
import { uuid } from "uuidv4";
import path from "path";
import { ProjectController } from "./controllers/ProjectController";
import { ProjectService } from "./services/projectServices";
import { SubitemService } from "./services/subitemService";
import { SubitemsController } from "./controllers/subitemsController";
import { UserController } from "./controllers/UserController";

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const app = express();
dotenv.config();

app.use(cors({ origin: ["http://localhost:3000", process.env.REACT_DOMAIN!] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export const userService = new UserService(knex);
const checkListService = new CheckListService(knex);
const projectService = new ProjectService(knex);
const subitemService = new SubitemService(knex);

export const authController = new AuthController(userService);
export const checkListController = new CheckListController(checkListService);
export const projectController = new ProjectController(projectService);
export const subitemsController = new SubitemsController(subitemService);
export const userController = new UserController(userService);

const permit = new Bearer({
  query: "access_token",
});
const isLoggedIn = createIsLoggedIn(permit, userService);
/* Routers */
app.post("/login", authController.login);
app.get("/userInfo", isLoggedIn, authController.getUserInfo);
app.post("/signup", authController.signUpNewUser);
app.post("/addProject", isLoggedIn, projectController.addProject);
app.post("/addChecklist/:pid", isLoggedIn, checkListController.addList);
app.post("/addSubItem", isLoggedIn, subitemsController.addSubItem);
app.get("/getAllList/:cid", isLoggedIn, checkListController.getAllList);
app.get("/getAllProjects", isLoggedIn, projectController.getProject);
app.get("/getProjectInfo/:pid", isLoggedIn, projectController.getProjectInfo);
app.get("/getSubitems/:cid", isLoggedIn, subitemsController.getSubitems);
app.put("/updateStatus/", isLoggedIn, subitemsController.updateStatus);
app.post(
  "/updateChecklistProgress/:cid",
  isLoggedIn,
  checkListController.updateProgressCircle
);
app.get("/getAllUsers", isLoggedIn, userController.getAllUsers);
app.put("/updateUserLayer", isLoggedIn, userController.updateUserLayer);
app.get("/getAllSubCon", isLoggedIn, userController.getAllSubCon);
app.delete("/deleteImage", isLoggedIn, checkListController.deleteImage);

const DIR = "./upload/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const uuid_string = uuid() + "-" + fileName;
    req.body.image_path = uuid_string;
    cb(null, uuid_string);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.get("/subItemImages/:sid", isLoggedIn, checkListController.getSubItemImage);

app.post(
  "/uploadSubitemImage",
  isLoggedIn,
  upload.single("subitemImg"),
  checkListController.uploadSubitemImage
);

app.use(express.static(path.join(__dirname, "upload")));

/* PORT*/
const PORT = 8080;
app.listen(PORT, () => {
  logger.info(`Listening at http://localhost:${PORT}/`);
  logger.info(`listening to port: ${PORT}`);
  if (process.env.CI) {
    process.exit(0);
  }
});

const MONITOR_MANAGER_PORT = 8090;
monitorManager.listen(MONITOR_MANAGER_PORT, () => {
  logger.info(`manager listening at http://localhost:${MONITOR_MANAGER_PORT}`);
});
