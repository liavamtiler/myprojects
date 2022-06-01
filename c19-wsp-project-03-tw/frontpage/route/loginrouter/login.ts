// import express from "express";
// import pg from "pg";
// import dotenv from "dotenv";
// import expressSession from "express-session";
// import { isLoggedInApi } from "./guards";
// import * as bcrypt from "bcryptjs"
// dotenv.config();

// const client = new pg.Client({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });

// client.connect();

// export const login = express.Router();

// // Config expressSession
// login.use(
//   expressSession({
//     secret: "Tecky Academy teaches typescript",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// login.use(express.urlencoded({ extended: true }));
// login.use(express.json());


// login.use(function (req, res, next) {
//   console.log(`path:${req.path}, ip:${req.ip}, method:${req.method}`);
//   next();
// });
// //get the user's info after login
// login.get("/userInfo", isLoggedInApi, async (req, res) => {
//   const user = req.session["user"];

//   res.json(user);
// });
// //Check password
// async function checkPassword(plainPassword: string, hashPassword: string) {
//   const match = await bcrypt.compare(plainPassword, hashPassword);
//   return match;
// }

// //Login
// // login.post("/login.html", async (req, res) => {

// //   const { username,password} = req.body;

// //   const foundUser = (await client.query(`SELECT * FROM users where name = $1`, [username])).rows[0];

// //   console.log(foundUser);

// //   if (!foundUser || !(await checkPassword(password, foundUser.password))) {
// //     res.status(401).json({ message: "Incorrect Username or Password" });
// //     return;
// //   }

// //   req.session["user"] = { id: foundUser.id , name:foundUser.name};

// //   res.status(200).json(req.session["user"]);
// //   console.log("success, you have login");
// //   console.log(req.session["user"].id);

// // });

// login.get("/user" ,async (req,res)=>{
//   if(req.session["user"]){
//     // const user = (await client.query(`SELECT * FROM users where id = $1` , [req.session["user"].id])).rows[0]
//     // console.log(user)
//     res.status(200).json(req.session["user"])
//     return 
//   }

// })

// //Logout and destroy the session
// login.get("/logout",(req,res)=>{
//   req.session?.destroy(()=>{
//     res.json("destroy")
//   })
// })


// // admin login 

// login.post("/login/admin", async (req,res)=>{
//   const {name,password} = req.body
//   console.log(req.body)
//   const foundAdminName = (await client.query(`SELECT * FROM users where name = $1`,[name])).rows[0]

  

//   if (!foundAdminName || !(await checkPassword(password, foundAdminName.password))){
//     res.status(401).json("invalid login or password")
//     return 
//   }
//   req.session["admin"] = { id: foundAdminName.id , name:foundAdminName.name , status:true}
//   res.status(200).json(req.session["admin"]);
//   console.log("success, you have login");
//   console.log(req.session["admin"])
// })



