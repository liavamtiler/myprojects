// import express from "express";
// import { Client } from "pg";
// import dotenv from "dotenv";

// export const searchBar = express.Router();

// dotenv.config();

// searchBar.use((req, res, next) => {
//   const currentTime = new Date().toISOString();
//   console.log(
//     `[INFO]  TIME : ${currentTime}  PATH: ${req.path} METHOD: ${req.method}  ID: ${req.ip}`
//   );
//   next();
// });
// searchBar.use(express.json());

// export const client = new Client({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });

// client.connect();

// searchBar.get("/searchResult/:sid", async (req, res) => {
//   const title = req.params.sid;

//   console.log(title);

//   const serchedResult = (
//     await client.query(
//       `SELECT * FROM product_details WHERE product_name like '%${req.params.sid}%' OR description like '%${req.params.sid}%' OR brand_name like '%${req.params.sid}%' `
//     )
//   ).rows;
//   console.log(serchedResult);


//   res.json(serchedResult);
// });
