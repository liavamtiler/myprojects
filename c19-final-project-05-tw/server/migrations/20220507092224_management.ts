import { Knex } from "knex";


const userLayersTable = "user_layers";
const categoriesTable = "categories";
const usersTable = "users";
const projectsTable = "projects";
const participantTable = "participant_list";
const checklistsTable = "checklists";
const subconChecklistTable = "subcon_checklists";
const checklistSubitemsTable = "checklist_subitems";
const reportResultContentsTable = "report_result_contents";
const subitemsImagePathTable = "subitems_image_path";



export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(userLayersTable, (table) => {
        table.increments();
        table.string("name").notNullable().unique();
        table.timestamps(false, true);
    })

    await knex.schema.createTable(categoriesTable, (table) => {
        table.increments();
        table.string("name").unique();
        table.timestamps(false, true);
    })

    await knex.schema.createTable(usersTable, (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.string("password").notNullable();
        table.string("email");
        table.string("company");
        table.integer("user_layers")
        table.foreign("user_layers").references(`${userLayersTable}.id`);
        table.integer("category_id")
        table.foreign("category_id").references(`${categoriesTable}.id`);
        table.timestamps(false, true);
    })

    await knex.schema.createTable(projectsTable, (table) => {
        table.increments();
        table.string("title").notNullable();
        table.string("projectcode");
        table.string("location");
        table.string("contact_person");
        table.string("type");
        table.string("estimated_cost");
        table.text("project_description");
        table.string("image_construction_plan");
        table.date("start_day");
        table.date("end_day");
        table.enum("project_status", ["active", "completed", "issue"]).defaultTo("active");
        table.date("date");
    })


    await knex.schema.createTable(participantTable, (table) => {
        table.increments();
        table.integer("users_id").notNullable();
        table.foreign("users_id").references(`${usersTable}.id`);
        table.integer("project_id").notNullable();
        table.foreign("project_id").references(`${projectsTable}.id`);
        table.timestamps(false, true);
    });


    await knex.schema.createTable(checklistsTable, (table) => {
        table.increments();
        table.string("area");
        table.string("description");
        table.date("checklist_start_day");
        table.date("checklist_end_day");
        table.enum("checklist_status", ["active", "completed", "issue",]).defaultTo("active");
        table.decimal("progress_percentage").defaultTo("0");
        table.integer("checklist_project_id");
        table.foreign("checklist_project_id").references(`${projectsTable}.id`);
    });

    await knex.schema.createTable(subconChecklistTable, (table) => {
        table.increments();
        table.integer("subcon_users_id");
        table.foreign("subcon_users_id").references(`${usersTable}.id`);
        table.integer("checklists_id");
        table.foreign("checklists_id").references(`${checklistsTable}.id`);
        table.timestamps(false, true);
    });

    await knex.schema.createTable(checklistSubitemsTable, (table) => {
        table.increments();
        table.string("subitem_name");
        table.string("subitem_description");
        table.enum("subitem_status", ["active", "completed", "issue",]).defaultTo("active");
        table.integer("subitem_checklists_id").notNullable();
        table.foreign("subitem_checklists_id").references(`${checklistsTable}.id`);
        table.timestamps(false, true);
    });

    await knex.schema.createTable(reportResultContentsTable, (table) => {
        table.increments();
        table.string("report_description");
        table.string("image_document");
        table.date("date");
        table.date("created_result_at");
        table.date("update_result_at");
        table.integer("report_checklists_id").notNullable();
        table.foreign("report_checklists_id").references(`${checklistsTable}.id`);
        table.timestamps(false, true);
    })

    await knex.schema.createTable(subitemsImagePathTable, (table) => {
        table.increments();
        table.string("image_path");
        table.boolean("status").defaultTo(true);
        table.integer("subitem_id").notNullable();
        table.foreign("subitem_id").references(`${checklistSubitemsTable}.id`);
        table.timestamps(false, true);
    })

}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(subitemsImagePathTable);
    await knex.schema.dropTable(reportResultContentsTable);
    await knex.schema.dropTable(checklistSubitemsTable);
    await knex.schema.dropTable(subconChecklistTable);
    await knex.schema.dropTable(checklistsTable);
    await knex.schema.dropTable(participantTable);
    await knex.schema.dropTable(projectsTable);
    await knex.schema.dropTable(usersTable);
    await knex.schema.dropTable(categoriesTable);
    await knex.schema.dropTable(userLayersTable);
}
