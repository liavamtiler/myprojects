import { Knex } from "knex";
import xlsx from "xlsx";
import path from "path";
import { hashPassword } from "../utils/hash";

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
    await trx.raw(/*sql*/ `TRUNCATE TABLE voting RESTART IDENTITY CASCADE`);
    await trx.raw(/*sql*/ `TRUNCATE TABLE candidates RESTART IDENTITY CASCADE`);
    await trx.raw(/*sql*/ `TRUNCATE TABLE campaigns RESTART IDENTITY CASCADE`);
    await trx.raw(/*sql*/ `TRUNCATE TABLE users RESTART IDENTITY CASCADE`);

    const users = await Promise.all(
      userData.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password.toString()),
      }))
    );
    await trx("users").insert(users);

    type CampaignItem = { campaign_id: number; campaign_code: string };
    const insertedCampaignArr: CampaignItem[] = await trx("campaigns")
      .insert(campaignData)
      .returning(["campaign_id", "campaign_code"]);

    const campaignMap = insertedCampaignArr.reduce(
      (acc, cur) => acc.set(cur.campaign_code, cur.campaign_id),
      new Map<string, number>()
    );

    const candidates = candidateData.map((candidate) => ({
      description: candidate.description,
      campaign_id: campaignMap.get(candidate.campaign_code),
    }));

    await trx("candidates").insert(candidates);

    await trx.commit();
  } catch (err) {
    console.error(err.message);
    await trx.rollback();
  }
}
