import { Knex } from "knex";

export class AdminService {
  constructor(private knex: Knex) {}

  async login(name: string) {
    return await this.knex.select("*").from("users").where("name", name);
    // await client.query(`SELECT * FROM users where name = $1`,[name])).rows[0]
  }

  async register(name: string, password: string, isAdmin: boolean, date: Date) {
    await this.knex
      .insert({ name: name, password: password, is_admin: isAdmin, created_at: date })
      .into("users")
      .returning("id");
  }
}
