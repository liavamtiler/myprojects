import { Knex } from "knex";
import xlsx from "xlsx";
import path from "path";
import {hashPassword} from "../utils/hash"

interface UserRow {
  username: string;
  password: string | number;
}

interface CampaignRow {
  campaign_code: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

interface candidateRow {
  campaign_code: string;
  description: string;
}

const BASE_PATH = path.join(__dirname, "datasets");

function readDataSet<T>(filename: string) {
  const userWorkbook = xlsx.readFile(path.join(BASE_PATH, filename), { cellDates: true });
  // raw true 可以將date 變返靚，佢會用返你既寫法
  // 用cell data true 一樣可以
  const Data = xlsx.utils.sheet_to_json<T>(userWorkbook.Sheets["Sheet1"]);
  return Data;
}

export async function seed(knex: Knex): Promise<void> {
  const userData = readDataSet<UserRow>("user.csv");
  const campaignData = readDataSet<CampaignRow>("campaign.csv");
  const candidateData = readDataSet<candidateRow>("candidate.csv");

  console.log(userData);
  console.log(campaignData);
  console.log(candidateData);

  const trx = await knex.transaction();

  try {

    await trx.raw(/*sql*/`TRUNCATE TABLE voting RESTART IDENTITY CASCADE`)
    await trx.raw(/*sql*/`TRUNCATE TABLE candidates RESTART IDENTITY CASCADE`)
    await trx.raw(/*sql*/`TRUNCATE TABLE campaigns RESTART IDENTITY CASCADE`)
    await trx.raw(/*sql*/`TRUNCATE TABLE users RESTART IDENTITY CASCADE`)

    const users =await Promise.all( userData.map(async (user)=>({
        // 如果唔同用forloop 用，出黎果件野係promise黎，所以Promise.all就可以解決
        ...user,
        password:await hashPassword(user.password.toString())

        // ...user 的意思係，將user 呢個object入面抽晒key values，放入去{}入面
        // 同一時間比password 佢，由於重覆左，後面入黎hash 果個會食左前面果個。
    })
))
    await trx("users").insert(users)

    type CampaignItem = {campaign_id:number;campaign_code:string }
    const insertedCampaignArr:CampaignItem[] = await trx("campaigns").insert(campaignData).returning(["campaign_id","campaign_code"])
    
    const campaignMap = insertedCampaignArr.reduce(
        (acc,cur)=>acc.set(cur.campaign_code,cur.campaign_id),
        new Map<string,number>()) 
    //用campaign_code做key，campaign_id 做value，之後方便下面將candidates 的campaign_id連結去campaign的campaign_id
    
    const candidates = candidateData.map(candidate=>({
        description:candidate.description,
        campaign_id:campaignMap.get(candidate.campaign_code)
    }))

    await trx ("candidates").insert(candidates)




    

    await trx.commit()
    // RESTART IDENTITY 自動重置清空資料表的欄位所擁有的序列。
    // CASCADE 自動清空所有對任何對此資料表具有外部鍵引用的資料表，或者由於 CASCADE 而加入群組的資料表。
  } catch (err) {
      console.error(err.message)
      await trx.rollback()
  }



  // const userWorkbook =xlsx.readFile(path.join(BASE_PATH,"user.csv"))
  // // console.log(userWorkbook.SheetNames)  // 無改名佢自動叫['Sheet1']
  // const userData= xlsx.utils.sheet_to_json(userWorkbook.Sheets['Sheet1'])
  // // console.log(userData)

  // const campaignWorkbook =xlsx.readFile(path.join(BASE_PATH,"campaign.csv"))
  // const campaignData= xlsx.utils.sheet_to_json(campaignWorkbook.Sheets['Sheet1'])
  // console.log(campaignData)

  // const candidateWorkbook =xlsx.readFile(path.join(BASE_PATH,"candidate.csv"))
  // const candidateData= xlsx.utils.sheet_to_json(candidateWorkbook.Sheets['Sheet1'])
  // console.log(candidateData)

  // await knex("table_name").insert([
  //     { id: 1, colName: "rowValue1" },
  //     { id: 2, colName: "rowValue2" },
  //     { id: 3, colName: "rowValue3" }
  // ]);
}

// Deletes ALL existing entries
// const trx = await knex.transaction()

// try{

// }catch(err){}

// // Inserts seed entries
