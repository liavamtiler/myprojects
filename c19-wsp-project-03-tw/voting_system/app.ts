import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressSession from "express-session";
import path from "path";
import { isLoggedInStatic } from "./utils/guard"

const app = express();

app.use(express.json());
app.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(`[DEBUG] request path: ${req.path} method: ${req.method}`);
  next();
});


app.use(express.static(path.join(__dirname, "public")));
app.use(isLoggedInStatic, express.static(path.join(__dirname, "private")));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // logger
  console.log(`[INFO] listening on port ${PORT}`);
});
