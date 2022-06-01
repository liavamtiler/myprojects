import { Knex } from "knex";

const tableName = Object.freeze({
    USER:"users",
    CAMPAIGN:"campaigns",
    CANDIDATE:"candidates",
    VOTING:"voting"
})

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName.USER,(table)=>{
        table.increments("user_id");
        table.string("username").notNullable().unique()
        table.string("password").notNullable()
        table.timestamps(false,true);

    });


    await knex.schema.createTable(tableName.CAMPAIGN,(table)=>{
        table.increments("campaign_id");
        table.text("description").notNullable()
        table.date("start_date").notNullable()
        table.date("end_date").notNullable()
        table.timestamps(false,true);
    });

    await knex.schema.createTable(tableName.CANDIDATE,(table)=>{
        table.increments("candidate_id");
        table.string("description").notNullable()
        table.integer("campaign_id").notNullable().unsigned()
        table.foreign("campaign_id").references(`${tableName.CAMPAIGN}.campaign_id`)
        table.timestamps(false,true);
    });

    await knex.schema.createTable(tableName.VOTING,(table)=>{
        table.increments("vote_id");
        table.integer("user_id").notNullable().unsigned();
        table.foreign("user_id").references(`${tableName.USER}.user_id`)
        table.integer("campaign_id").notNullable().unsigned();
        table.foreign("campaign_id").references(`${tableName.CAMPAIGN}.campaign_id`)
        table.integer("candidate_id").notNullable().unsigned();
        table.foreign("candidate_id").references(`${tableName.CANDIDATE}.candidate_id`);
        table.unique(["user_id","campaign_id"])  // 呢個就設計成一個user_id，只可以配一個campaign_id
        table.timestamps(false,true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName.VOTING)
    await knex.schema.dropTable(tableName.CANDIDATE)
    await knex.schema.dropTable(tableName.CAMPAIGN)
    await knex.schema.dropTable(tableName.USER)

}

