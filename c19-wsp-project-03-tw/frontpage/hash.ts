import * as bcrypt from "bcryptjs"


export async function checkPassword(plainPassword: string, hashPassword: string) {
    const match = await bcrypt.compare(plainPassword, hashPassword);
    return match;
  }