import { Knex } from "knex";
import { logger } from "../utils/logger";
export class UserService {
  constructor(private knex: Knex) {}

  getUserByUserName = async (username: string) => {
    const result = (
      await this.knex.raw(
        /*SQL*/ `SELECT users.*, user_layers.name as user_layer_name FROM users 
          INNER JOIN user_layers ON users.user_layers = user_layers.id WHERE users.username = ? `,
        [username]
      )
    ).rows;
    logger.info(result, "result");
    console.log("@@@@");
    return result;
  };

  getUserById = async (id: number) => {
    const result = (
      await this.knex.raw(
        /*SQL*/ `SELECT users.*, user_layers.name as user_layer_name FROM users 
          INNER JOIN user_layers ON users.user_layers = user_layers.id WHERE users.id = ? `,
        [id]
      )
    ).rows;
    return result[0];
  };

  signUpRequest = async (
    username: string,
    password: string,
    email: string,
    company: string
  ) => {
    logger.info("this.signUpRequest is triggered");
    console.log(username, password, email, company);
    logger.info(
      "username: string, password: string,phone: string, email: string,company: string |||",
      username,
      password,
      email,
      company
    );

    const result = await this.knex
      .select("username")
      .from("users")
      .where("username", `${username}`)
      .limit(1);

    const sameUsername = JSON.stringify(result[0]);
    if (sameUsername) {
      return "false";
    }
    const returnId = await this.knex
      .insert({
        username: `${username}`,
        password: `${password}`,
        email: `${email}`,
        company: `${company}`,
      })
      .returning("id")
      .into("users");

    return returnId;
  };

  getAllSubCon = async () => {
    const result = (
      await this.knex.raw(
        /* sql */ `SELECT id, company, user_layers FROM users where user_layers=3`
      )
    ).rows;
    return result;
  };
  getAllUsers = async () => {
    const result = (await this.knex.raw(/*sql*/ `SELECT * FROM  users`)).rows;
    return result;
  };

  updateUserLayer = async (userLayer: number, userId: number) => {
    const result = (
      await this.knex.raw(
        /*sql*/ `UPDATE users SET user_layers=? WHERE users.id =? returning *`,
        [userLayer, userId]
      )
    ).rows[0];
    return result;
  };
}
