import { Client } from "pg";
import dotenv from "dotenv";

import XLSX from "xlsx";

// dotenv.config({ path: "./.env" });
dotenv.config();

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

const workbook = XLSX.readFile("downloadPhoto.xlsx");
const productWorksheet = workbook.Sheets["products"];

async function demo() {
  await client.connect();
  const products: any = XLSX.utils.sheet_to_json(productWorksheet);

  for (let product of products) {
    await client.query(
      `INSERT INTO product_details (product_name,brand_name,original_price_g,weight_g,description,image,pet_name,sold)VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        product.product_name,
        product.brand_name,
        product.original_price_g,
        product.weight_g,
        product.description,
        product.image,
        product.pet_name,
        product.sold,
      ]
    );
  }
  console.log("完成");
  await client.end();
}

demo();
