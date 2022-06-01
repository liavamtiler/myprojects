import pg from "pg"
import {Product} from "../model"


export class CatproductService {
    constructor(private client:pg.Client){}

    async getProduct (){
        const catProducts:Product[] = (
            await this.client.query(`SELECT * FROM product_details WHERE pet_name like 'cat' limit 5 `)).rows;
            return catProducts
        }
}