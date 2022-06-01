import {DogProductService} from "../service/DogproductService"
import {Request,Response} from "express"

export class DogProductController {
    constructor(private DogProductService:DogProductService){}

    getProduct = async(req:Request,res:Response)=>{
        const dogProducts = await this.DogProductService.displayDogProduct()
        res.json(dogProducts)
    }


}