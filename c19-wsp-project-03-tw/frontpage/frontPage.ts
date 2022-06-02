import express from "express";
import path from "path";
import { Client } from "pg";
import dotenv from "dotenv";
import multer from "multer";
import expressSession from "express-session";
import Knex from "knex";

// import { routes } from './route';
import { UserController } from "./controller/UserController";
import { UserService } from "./service/userServices";
import { DogProductController } from "./controller/DogProductController";
import { DogProductService } from "./service/DogproductService";
import { CatproductController } from "./controller/CatproductController";
import { CatproductService } from "./service/CatproductService";
import { ProductController } from "./controller/productController";
import { ProductService } from "./service/productService";
import { AdminController } from "./controller/adminController";
import { AdminService } from "./service/adminService";
import * as knexConfig from "./knexfile";

import { loadHitProduct } from "./route/hitproductrouter/hitproduct";

const knex: any = Knex(knexConfig["development"]);

const app = express();
dotenv.config();

export const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.resolve("./uploads"));
    cb(null, path.resolve("./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
export const profileUpload = multer({ storage: profileStorage });

app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(
    `[INFO]  TIME : ${currentTime}  PATH: ${req.path} METHOD: ${req.method}  ID: ${req.ip}`
  );
  next();
});

app.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();

// admin Route

const adminService = new AdminService(knex);
const adminController = new AdminController(adminService);

app.post("/login/admin", adminController.login);
app.post("/register/admin", adminController.register);

// product Route

const productService = new ProductService(client);
const productController = new ProductController(productService);

app.get("/searchResult/:sid", productController.searchingProduct);
app.get("/hit", productController.getHitProduct);
app.get("/productDetail.html/:did", productController.getProductDetail);
app.get("/product/sort/", productController.sortProduct);
app.get("/numberOFProductsInCart", productController.showCartLength);
app.get("/updateProductSold/:pid", productController.productsold);
app.get("/shoppingHistory", productController.showPurchasedProduct);
app.get("/comments/:cid", productController.showComment);
app.get("/check/", productController.checkCommentUser);
app.get("/alllikeproduct/:pid", productController.showLikeNumber);

//Load Dog Products Route

const dogproductService = new DogProductService(client);
const dogproductController = new DogProductController(dogproductService);

app.get("/products/dog", dogproductController.getProduct);

const catProductService = new CatproductService(client);
const catproductController = new CatproductController(catProductService);

app.get("/products/cat", catproductController.getproduct);

// user route

const userService = new UserService(client);
const userController = new UserController(userService, productService);

app.post("/login", userController.login);
app.get("/user", userController.checkOnline);
app.get("/logout", userController.logout);
app.post("/register", profileUpload.single("image"), userController.registration);

app.post("/addtocart/:aid", userController.addedProductToCart);
app.get("/getpurchasing-item", userController.purchaseProduct);
app.get("/purchaseHistory", userController.userHistory);
app.delete("/delete/:cid", userController.cancelWishlistItem);

app.post("/comments/:cid", userController.giveComment);
app.put("/comments", userController.editComment);
app.post("/likeproduct/:pid", userController.likeProduct);
app.put("/likeproduct/cancel/:pid", userController.cancelLike);

//  app.use(history)

//  app.use(deleteItem)
//  app.use(updateSold)
//  app.use(newProducts)
app.use(loadHitProduct);
//  app.use(login);
// app.use(routes);
// app.use(searchBar)
// app.use(productDetails);

const frontPagePath = "public";
app.use(express.static(path.join(__dirname, frontPagePath)));
app.use(express.static(path.join(__dirname, "admin")));
app.use(express.static(path.join(__dirname, "protected")));

// app.use(register);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
