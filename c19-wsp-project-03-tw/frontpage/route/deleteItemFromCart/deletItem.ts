import express from "express";
import { Client } from "pg";
import dotenv from "dotenv";
import expressSession from "express-session";


export const deleteItem = express.Router();
dotenv.config();
deleteItem.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);
deleteItem.use(express.json());
deleteItem.use(express.urlencoded({ extended: true }));
export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();


//Delete Items according to the User_id And Product_id
deleteItem.delete("/delete/:cid", async (req,res) => {
  console.log(req.params.cid)
  let userId=req.session['user'].id
  let getPid=req.params.cid
  const deleteItems = (await client.query(`DELETE FROM cart_products WHERE user_id =${userId} AND id=${getPid}`));
  res.status(200).json(deleteItems);
})