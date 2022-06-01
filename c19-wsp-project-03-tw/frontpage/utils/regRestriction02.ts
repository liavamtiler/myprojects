
import {Client} from 'pg';

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

// to confirm no duplicated username
export async function checkUsernameDuplicated(username:string){
    const matchUser = (await client.query(`SELECT * From users WHERE name = $1`,[
        username
    ])).rows
    console.log(matchUser)
    if (matchUser.length >=1){
        return false
    }else return true
}


