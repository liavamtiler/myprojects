import pg from "pg";
import { Product } from "../model";

export class ProductService {
  constructor(private client: pg.Client) {}

  async searchProduct(searchItem: string | number) {
    const searchResult: Product[] = (
      await this.client.query(
        `SELECT * FROM product_details WHERE product_name like '%${searchItem}%' 
    OR description like '%${searchItem}%' OR 
    brand_name like '%${searchItem}%'`
      )
    ).rows;

    return searchResult;
  }

  async getHitProduct(){
    const hitProduct: Product[] = (
      await this.client.query(
      `SELECT * from product_details order by sold DESC limit 5 offset 5`
    )).rows;

    return hitProduct;
  }


  async getProductDetail(productID:number) {
    const productDetails = (
      await this.client.query(`SELECT * FROM product_details WHERE id = '${productID}'`)
    ).rows;

    console.log(productDetails)
    return  productDetails
  }

  async sortProduct() {
    const wholeSheet= (await this.client.query(`SELECT * from product_details`)).rows
    return wholeSheet
  }
 
  async showProductLength(userId:number){
    const numberOFProductsInCart= (await this.client.query(`SELECT * FROM cart_products where user_id=${userId} `)).rows
    return numberOFProductsInCart
  }

  async productSold(productName:string) {
    const updateProductSold= ( await this.client.query(`UPDATE product_details SET sold=sold+1 where product_name like '%${productName}%'` )).rows[0]
    return updateProductSold
  }

  async insertToHistory(product_name:string,original_price_g:number,description:string,image:string,UserID:number){
    const productInhistory = await this.client.query(`INSERT INTO histories (product_name,original_price_g,description,image,user_id) VALUES ($1,$2,$3,$4,$5)`,[
      product_name,
      original_price_g,
      description,
      image,
      UserID
   ]) 
   return productInhistory
  }
 
  async showHistory (UserID:number){
    const getRecord= (await this.client.query(`SELECT * FROM histories WHERE user_id =${UserID}`)).rows
    return getRecord
  }

  async delProduct(userID:number){
    const deleteCart=( await this.client.query(`DELETE FROM cart_products where user_id =${userID}`)).rows
    return deleteCart
}

  async getComment(productID:number) {
   
    const productComment = (await this.client.query(`SELECT * FROM comments WHERE product_id = ${productID} ORDER BY created_at DESC`)).rows
    return productComment
    }
    
  async checkCommentUser (UserID:number){
    const checkComment = (await this.client.query(`SELECT * FROM comments WHERE user_id = ${UserID} `)).rows[0]
    return checkComment
  }

  async getProductfromLike (producID:number){

    const showLikeNumber= (await this.client.query( `SELECT * from interaction where product_id=${producID}`)).rows

    // console.log(1)
    return showLikeNumber
  }


  async getAllike  (producID:number) {
    const totalLike = (await this.client.query(`SELECT * from interaction where product_id=${producID}`)).rows[0]

    return totalLike
  }

}



