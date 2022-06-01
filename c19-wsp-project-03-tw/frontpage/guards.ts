import { Request, Response, NextFunction } from "express";

//check if it a user login
 export const isLoggedInApi = (req: Request, res: Response, next: NextFunction) => {
    if (req.session["user"]) {
        next();
        return;
    }

    console.log("[INFO] user is not logged in");
    res.status(401).json({message: "Unauthorized"})
}

import * as bcrypt from 'bcryptjs';


const SALT_ROUND = 10

export async function hashPassword(plainPassword:string) {
    const hash = await bcrypt.hash(plainPassword,SALT_ROUND)
    return hash 
    
}