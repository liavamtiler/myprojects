import { Knex } from "knex";

    const campaign_tablName="campaigns"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(campaign_tablName,(table)=>{
        table.string("campaign_code",10).notNullable().unique;
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(campaign_tablName,(table)=>{
        table.dropColumn("campaign_code");
    })
}

