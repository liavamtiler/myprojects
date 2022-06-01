import express from "express";
import expressSession from "express-session";


export const comment = express();

//Config the data from Client Side
comment.use(express.urlencoded({ extended: true }));
comment.use(express.json());

//Config expressSession
comment.use(
  expressSession({
    secret: "comment section",
    resave: true,
    saveUninitialized: true,
  })
);

