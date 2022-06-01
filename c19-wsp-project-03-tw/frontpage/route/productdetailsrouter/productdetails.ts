import express from "express";
import { Client } from "pg";
import dotenv from "dotenv";
import { comment } from "./comment";
import { addToCart } from "../addTocartRouter/addToCart";
import { purchasing } from "../purchasingRouter/purchasing";
import expressSession from "express-session";
import moment from "moment";

export const productDetails = express.Router();
dotenv.config();

productDetails.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(
    `[INFO]  TIME : ${currentTime}  PATH: ${req.path} METHOD: ${req.method}  ID: ${req.ip}`
  );
  next();
});
productDetails.use(express.json());

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

productDetails.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

client.connect();

productDetails.use(comment);

//Get the products
productDetails.get("/productDetail.html/:did", async (req, res) => {
  console.log(req.params.did);
  const selectedDogProduct = (
    await client.query(`SELECT * FROM product_details WHERE id = '${req.params.did}'`)
  ).rows;

  res.json(selectedDogProduct);
});

productDetails.use(addToCart);
productDetails.use(purchasing);

//update the number of likes for products
productDetails.put("/likeproduct/:pid", async (req, res) => {
  const findMatch = await client.query(
    `SELECT * from interaction where product_id=${req.params.pid}`
  );
  if (findMatch.rows.length > 0) {
    const createProductLike = (
      await client.query(
        `UPDATE interaction SET like_number = like_number+1 where product_id=${req.params.pid} `
      )
    ).rows[0];
    console.log(`length> 1 ${createProductLike}`);
  } else {
    const Insert = (
      await client.query(`INSERT INTO interaction (product_id, like_number) VALUES ($1,$2)`, [
        req.params.pid,
        1,
      ])
    ).rows[0];

    console.log("length=0" + Insert);
  }
});

//decrease the number of likes for products
productDetails.put("/likeproduct/cancel/:pid", async (req, res) => {
  const findMatch = await client.query(
    `SELECT * from interaction where product_id=${req.params.pid}`
  );
  if (findMatch.rows.length > 0) {
    const createProductLike = (
      await client.query(
        `UPDATE interaction SET like_number = like_number-1 where product_id=${req.params.pid} `
      )
    ).rows[0];
    console.log(`length> 1 ${createProductLike}`);
    return;
  }
});

//Get the total numbers of likes
productDetails.get("/alllikeproduct/:pid", async (req, res) => {
  const totalLike = (
    await client.query(`SELECT * from interaction where product_id=${req.params.pid}`)
  ).rows;
  console.log(totalLike);
  res.status(200).json(totalLike);
});

// comment section

productDetails.post("/comments/:cid", async (req, res) => {
  const { content } = req.body;
  const insertedComment = await client.query(
    `INSERT INTO comments (content,created_at,user_id,product_id,user_name) VALUES ($1,$2,$3,$4,$5)`,
    [content, moment(), req.session["user"].id, req.params.cid, req.session["user"].name]
  );
  res.json(insertedComment);
});

comment.get("/comments/:cid", async (req, res) => {
  const productComment = (
    await client.query(
      `SELECT * FROM comments WHERE product_id = ${req.params.cid} ORDER BY created_at DESC`
    )
  ).rows;
  res.status(200).json(productComment);
});
//Update Comments

comment.put("/comments", async (req, res) => {
  const { content, id } = req.body;
  const editedComment = (
    await client.query("UPDATE comments SET content = $1 WHERE id = $2", [content, id])
  ).rows[0];
  res.json(editedComment);
});
//Delete Comments
comment.delete("/comments/:cid", async (req, res) => {
  const deleteComment = await client.query(`DELETE FROM comments WHERE id = $1`, [req.params.cid]);
  res.status(200).json(deleteComment);
});
comment.get("/check/", async (req, res) => {
  const checkComment = (
    await client.query(`SELECT * FROM comments WHERE user_id = ${req.session["user"].id} `)
  ).rows[0];
  res.status(200).json(checkComment);
});
