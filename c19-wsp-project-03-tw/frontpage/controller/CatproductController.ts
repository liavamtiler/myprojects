import {CatproductService} from "../service/CatproductService"
import {Request,Response} from "express"


export class CatproductController {
    constructor(private catProductService : CatproductService){}

    getproduct = async (req:Request,res:Response)=>{
        const catProducts = await this.catProductService.getProduct()
        res.json(catProducts);
    }
}