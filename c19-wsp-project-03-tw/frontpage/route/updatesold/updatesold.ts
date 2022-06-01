import express from "express";
import { Client } from "pg";
import dotenv from "dotenv";
import expressSession from "express-session";


export const updateSold = express.Router();
dotenv.config();
updateSold.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);
updateSold.use(express.json());
updateSold.use(express.urlencoded({ extended: true }));
export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();
//Update the number of sold 
updateSold.get("/updateProductSold/:pid", async(req,res)=>{ 
  let getPid=req.params.pid
  const updateProductSold= ( await client.query(`UPDATE product_details SET sold=sold+1 where product_name like '%${getPid}%'` )).rows[0]
  console.log(updateProductSold)
  res.json(updateProductSold)
})
//Get the number of items in the Cart

updateSold.get('/getCart',async(req,res)=>{ 
  let userId=req.session['user'].id
  let productNumber= (await client.query(`SELECT * FROM cart_products where user_id=${userId}`)).rows
  res.json(productNumber)
})
