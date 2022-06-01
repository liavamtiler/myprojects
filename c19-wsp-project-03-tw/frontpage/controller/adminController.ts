import {AdminService} from "../service/adminService"
import { Request, Response } from 'express';
import {checkPassword} from "../hash"
import {hashPassword} from "../guards"


export class AdminController {
    constructor(private adminService:AdminService){}

login = async (req:Request,res:Response)=>{
    
    const name = req.body.name
    const password = req.body.password

    console.log(req.body)
    const foundAdminName = await this.adminService.login(name)
    const foundAdminNames = foundAdminName[0]
    
    if (!foundAdminName || !(await checkPassword(password, foundAdminNames.password))){
        res.status(401).json("invalid login or password")
        return 
    }
    req.session["admin"] = { id: foundAdminNames.id , name:foundAdminNames.name , status:true}
    res.status(200).json(req.session["admin"]);
    console.log("success, you have login");
    console.log(req.session["admin"])

    }

register = async (req:Request,res:Response)=>{

    const { name, password } = req.body;

    await this.adminService.register(name,await hashPassword(password),true, new Date())
    
    res.status(200).json("成功了");
    console.log("you are new admin ");
    res.end()
  }
  

}
