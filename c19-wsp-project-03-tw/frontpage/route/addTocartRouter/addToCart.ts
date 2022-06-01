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
export const addToCart = express.Router();
dotenv.config();
//config session 
addToCart.use(
    expressSession({
      secret: "Tecky Academy teaches typescript",
      resave: true,
      saveUninitialized: true,
    })
  );

 //config Date
addToCart.use((req,res,next)=>{
    const currentTime = new Date().toISOString()
    console.log(`[INFO]  TIME : ${currentTime}  PATH: ${req.path} METHOD: ${req.method}  ID: ${req.ip}`)
    next()
})
addToCart.use(express.json())
//Add to Cart by Product's ID 
addToCart.get("/addtocart/:aid" ,async (req,res)=>{
    const selectedProducts = (await client.query(`SELECT * FROM product_details WHERE id = '${req.params.aid}'`)).rows[0]
    await client.query(`INSERT INTO cart_products (product_name,original_price_g,description,image,user_id) VALUES ($1,$2,$3,$4,$5)`,[
        selectedProducts.product_name,
        selectedProducts.original_price_g,
        selectedProducts.description,
        selectedProducts.image,
        req.session["user"].id
    ])    
    
    
    console.log("you have inserted into carts")
    res.json(selectedProducts)
})
//Show Product Numbers in Cart
addToCart.get( '/numberOFProductsInCart', async(req,res)=>{ 
    let userId=req.session['user'].id
    const numberOFProductsInCart= (await client.query(`SELECT * FROM cart_products where user_id=${userId} `)).rows
    res.json(numberOFProductsInCart)
})