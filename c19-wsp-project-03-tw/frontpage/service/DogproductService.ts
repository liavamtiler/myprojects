import pg from "pg"
import {Product} from "../model"

export class DogProductService {
    constructor(private client:pg.Client){}

    async displayDogProduct () {
      const dogProducts:Product[]=  (await this.client.query(`SELECT *  FROM product_details WHERE pet_name like 'dog' limit 5 `)).rows
        return dogProducts
    }

}