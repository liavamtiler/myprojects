import { newProduct } from "./models";
import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();

export const newProducts = express.Router();

newProducts.use(express.urlencoded({ extended: true }));
newProducts.use(express.json());

export const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.resolve("./public/img/product_img"));
    cb(null, path.resolve("./public/img/product_img"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
export const profileUpload = multer({ storage: profileStorage });

newProducts.post("/add-product", profileUpload.single("product_image"), async (req, res) => {
  const {
    newProductName,
    brandName,
    originalPrice,
    weight,
    description,
    animalType,
    soldNumber,
  }: newProduct = req.body;

  await client.query(
    `INSERT INTO product_details (product_name , brand_name,original_price_g , weight_g , description ,image ,pet_name ,sold) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      newProductName,
      brandName,
      originalPrice,
      weight,
      description,
      req.file?.filename,
      animalType,
      soldNumber,
    ]
  );

  res.status(200).json("Success");
});
