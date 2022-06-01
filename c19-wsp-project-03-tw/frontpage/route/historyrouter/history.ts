import express from "express";
import { Client } from "pg";
import dotenv from "dotenv";
import expressSession from "express-session";


export const history = express.Router();
dotenv.config();
history.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);
history.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(
    `[INFO]  TIME : ${currentTime}  PATH: ${req.path} METHOD: ${req.method}  ID: ${req.ip}`
  );
  next();
});
history.use(express.json());
history.use(express.urlencoded({ extended: true }));
export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();
//Get all the Product in Cart by a specific session and check if it is a empty cart
history.get('/purchaseHistory', async(req,res)=>{
  let userId=req.session['user'].id
  let productNumber= (await client.query(`SELECT * FROM cart_products where user_id=${userId}`)).rows
  if(productNumber.length==0) {
    res.json({Message:"Your Cart is Empty "})
    return
  }

//if not empty, get all the products and insert them into History table after payment
const cartProducts= (await client.query(`SELECT * FROM cart_products `)).rows
for (const products of cartProducts){ 
  await client.query(`INSERT INTO histories (product_name,original_price_g,description,image,user_id) VALUES ($1,$2,$3,$4,$5)`,[
    products.product_name,
    products.original_price_g,
    products.description,
    products.image,
    req.session["user"].id
 ])  
}

//after payment , empty the cart with the user session
const deleteCart=( await client.query(`DELETE FROM cart_products where user_id =${userId}`)).rows
console.log(`${deleteCart} represents Successfully empty the cart_products `)
res.json({Message: "Payment is successful "})
 })



