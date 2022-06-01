// import express from "express";
// import { Client } from "pg";
// import dotenv from "dotenv";
// import path from "path";
// import { UserAccount } from "./model";
// import { lengthRange, checkPassword, checkDateOFBirth } from "../../utils/regRestriction";
// import { checkUsernameDuplicated } from "../../utils/regRestriction02";
// import  moment from "moment";
// import  multer from "multer";
// import { hashPassword } from "./guard/guard";

// dotenv.config();
// export const register = express.Router();
// register.use(express.urlencoded({ extended: true }));
// register.use(express.json());



// export const profileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(path.resolve("./uploads"));
//     cb(null, path.resolve("./uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
//   },
// });
// export const profileUpload = multer({ storage: profileStorage });



// const client = new Client({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });

// client.connect();

// register.use((req, res, next) => {
//   console.log(`[INFO] PATH : ${req.path}  IP: ${req.ip}  METHOD ${req.method}`);
//   next();
// });


// register.post("/register", profileUpload.single("image"), async (req, res) => {
//   // handle different case of registration

//   const { name, password, date_of_birth, gender }: UserAccount = req.body;
//   if (!name || !password || !date_of_birth || !gender) {
//     res.status(400).json("未完成所有表格");
//     return;
//   }

//   if (!lengthRange(name.length, 6, 15)) {
//     res.status(401).json("帳號名稱不符規格");
//     return;
//   }

//   if (!checkPassword(password)) {
//     res.status(401).json("密碼不符規格");
//     return;
//   }

//   if (!checkDateOFBirth(date_of_birth)) {
//     res.status(406).json("年紀太少了");
//     return;
//   }


//   if (!checkUsernameDuplicated(name)) {
//     res.status(409).json("重覆帳號");
//   }

//   console.log(req.body);
//   await client.query(
//     `INSERT INTO users (name,password,date_of_birth,gender,created_at) VALUES ($1,$2,$3,$4,$5) `,
//     [
//       req.body.name,
//       await hashPassword(req.body.password),
//       req.body.date_of_birth,
//       req.body.gender,
//       moment(new Date()),
//     ]
//   );
//     console.log(req.file)
//   res.status(200).json("成功了");
//   console.log("you have insert information ");
// });


// //  registration admin 


// register.post("/register/admin", profileUpload.single("image"), async (req, res) => {
//   // handle different case of registration

//   const { name, password }: UserAccount = req.body;

//   console.log(req.body);
//   await client.query(
//     `INSERT INTO users (name,password,is_admin,created_at) VALUES ($1,$2,$3,$4) `,
//     [
//       name,
//       await hashPassword(password),
//       true,
//       moment(new Date()),
//     ]
//   );
//     console.log(req.file)
//   res.status(200).json("成功了");
//   console.log("you have insert information ");
//   res.end()
// });



