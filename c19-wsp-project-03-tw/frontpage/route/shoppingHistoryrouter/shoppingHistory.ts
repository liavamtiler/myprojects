import express from 'express';
import dotenv from 'dotenv';
import {Client} from 'pg';
import expressSession from "express-session";

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});
client.connect();
export const getHistory = express.Router();
dotenv.config();
getHistory.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

//Get the Shopping History by user_session
getHistory.get('/shoppingHistory' ,async(req,res)=>{
  let userId=req.session['user'].id
  const getRecord= (await client.query(`SELECT * FROM histories WHERE user_id =${userId}`)).rows
  res.json(getRecord)
  })


