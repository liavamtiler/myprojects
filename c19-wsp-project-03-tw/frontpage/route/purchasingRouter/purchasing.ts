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

export const purchasing = express.Router();
purchasing.use(express.json());

dotenv.config();

purchasing.use(
    expressSession({
      secret: "Tecky Academy teaches typescript",
      resave: true,
      saveUninitialized: true,
    })
  );

//Date config

purchasing.use((req,res,next)=>{
    const currentTime = new Date().toISOString()
    console.log(`[INFO]  TIME : ${currentTime}  PATH: ${req.path} METHOD: ${req.method}  ID: ${req.ip}`)
    next()
})
purchasing.use(express.json())
//Check if a user login then proceed the shopping 

purchasing.get("/getpurchasing-item",async (req,res)=>{
    if(!req.session["user"]){
        res.status(400)
        console.log("你未買野！")
        return 
    }
    const purchasingProduct =(await client.query(`SELECT * FROM cart_products where user_id = $1` , [req.session["user"].id])).rows
    console.log(purchasingProduct)
    res.status(200).json(purchasingProduct)

})
