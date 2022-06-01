import { Client } from "pg"; //after we install a package "pg", then import
import dotenv from "dotenv"; //config the connection
import express from "express";


export const loadHitProduct = express();
dotenv.config();
 loadHitProduct.use(express.json());

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();
//get give products order by sold
 loadHitProduct.get("/hits", async (req, res) => {
  const result = (
    await client.query(
      `SELECT * from product_details order by sold DESC limit 5 offset 5`
    )
  ).rows;
  res.json(result);
  // console.log(result)

});



