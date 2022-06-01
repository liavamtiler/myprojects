import pg from "pg";
import { User } from "../model";

export class UserService {
  constructor(private client: pg.Client) {}

  async getUser(username: string) {
    const user: User[] = (
      await this.client.query(`SELECT * FROM users where name = $1`, [username])
    ).rows;
    return user;
  }

  async registration(
    name: string,
    password: string,
    date_of_birth: Date,
    gender: string,
    date: Date
  ) {
    await this.client.query(
      `INSERT INTO users (name,password,date_of_birth,gender,created_at) VALUES ($1,$2,$3,$4,$5) `,
      [name, password, date_of_birth, gender, date]
    );
  }
  async addProductToCart(
    name: string,
    price: number,
    description: string,
    image: string,
    userID: number
  ) {
    await this.client.query(
      `INSERT INTO cart_products (product_name,original_price_g,description,image,user_id) VALUES ($1,$2,$3,$4,$5)`,
      [name, price, description, image, userID]
    );
  }

  async userPurchasingHistory(userID: number) {
    let productNumber = (
      await this.client.query(`SELECT * FROM cart_products where user_id=${userID}`)
    ).rows;
    return productNumber;
  }

  async cancelWishlistItem(userID: number, productID: number) {
    const cancelItems = await this.client.query(
      `DELETE FROM cart_products WHERE user_id =${userID} AND id=${productID}`
    );
    return cancelItems;
  }

  async giveCommentToProduct(
    content: string,
    time: Date,
    userID: number,
    productId: number,
    userName: string
  ) {
    const insertedComment = await this.client.query(
      `INSERT INTO comments (content,created_at,user_id,product_id,user_name) VALUES ($1,$2,$3,$4,$5)`,
      [content, time, userID, productId, userName]
    );
    return insertedComment;
  }

  async editComment(content: string, userID: number) {
    const editedComment = (
      await this.client.query("UPDATE comments SET content = $1 WHERE id = $2", [content, userID])
    ).rows[0];
    return editedComment;
  }

  async givelike(productId: number) {
    const giveLike = (
      await this.client.query(
        `UPDATE interaction SET like_number = like_number+1 where product_id=${productId} `
      )
    ).rows[0];
    return giveLike;
  }
  async initLike(productId: number) {
    const initLike = await this.client.query(
      `INSERT INTO interaction (product_id, like_number) VALUES ($1,$2)`,
      [productId, 1]
    );
    return initLike;
  }

  async cancelLike(productId: number) {
    const cancelLike = (
      await this.client.query(
        `UPDATE interaction SET like_number = like_number-1 where product_id=${productId} `
      )
    ).rows[0];
    return cancelLike;
  }
}
