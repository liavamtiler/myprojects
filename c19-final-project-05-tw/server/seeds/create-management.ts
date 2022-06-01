import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  await knex.raw("TRUNCATE checklist_subitems RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE subcon_checklists RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE checklists RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE participant_list RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE projects RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE user_layers RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE categories RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE checklist_subitems RESTART IDENTITY CASCADE");

  // Inserts seed entries
  await knex("categories").insert([
    { id: 1, name: "Hong Kong Cement Company Limited" },
    { id: 2, name: "Garish Crown Timber Limited" },
    { id: 3, name: "Sky Waterproof & Contractor" },
    { id: 4, name: "Chuen Hing Marble Work Limited" },
    { id: 5, name: "SHUI KEE HONG PAINT PRODUCTS COMPANY LIMITED" },
    { id: 6, name: "PO TAK CONSTRUCTION CO.LIMITED" },
  ]);

  await knex("user_layers").insert([
    { id: 1, name: "admin" },
    { id: 2, name: "supervisor" },
    { id: 3, name: "subcontractor" },
  ]);

  const hashedPassword = await hashPassword("123456");
  await knex("users").insert([
    {
      username: "admin",
      password: hashedPassword,
      company: "MTR",
      category_id: "6",
      user_layers: "1",
    },
    {
      username: "terrence",
      password: hashedPassword,
      company: "SHUI KEE HONG PAINT PRODUCTS COMPANY LIMITED",
      category_id: "5",
      user_layers: "2",
    },
    {
      username: "jimmy",
      password: hashedPassword,
      company: "Chuen Hing Marble Work Limited",
      category_id: "4",
      user_layers: "2",
    },
    {
      username: "Garish",
      password: hashedPassword,
      company: "Garish Crown Timber Limited",
      category_id: "2",
      user_layers: "3",
    },
  ]);

  await knex("projects").insert([
    {
      title: "Central reclamation phase III engineering works",
      project_description: " Construction of Central - Wan Chai Bypass tunnel",
      location: "Wan Chai ",
      estimated_cost: "$5.7615 billion",
      image_construction_plan: "floorplan.jpg",
      start_day: "2021-10-23",
      end_day: "2025-04-01",
      type: "Tunnel",
      projectcode: "CL7343",
      contact_person: "jason",
    },
    {
      title:
        "Kai Tak development - stage 1 advance infrastructure works for developments at the southern part of the former runway",
      project_description:
        "construction of approximately 1.8 km long single 2-lane carriageway and associated footpaths and landscaping works",
      location: "Kai Tak ",
      estimated_cost: "$540 million",
      image_construction_plan: "floorplan.jpg",
      start_day: "2021-10-23",
      end_day: "2023-01-03",
      type: "footpaths",
      projectcode: "7741CL",
      contact_person: "jason",
    },
    {
      title: "CitiBank branch refurbishment ",
      project_description: "",
      location: "kowloon bay ",
      estimated_cost: "$1 million",
      image_construction_plan: "floorplan.jpg",
      start_day: "2022-5-23",
      end_day: "2023-01-03",
      type: "Shop",
      projectcode: "79995P",
      contact_person: "adams",
    },
  ]);

  await knex("participant_list").insert([
    { users_id: 3, project_id: 1 },
    { users_id: 4, project_id: 1 },
    { users_id: 2, project_id: 1 },
  ]);

  await knex("checklists").insert([
    {
      area: "roadside amenity areas",
      description: "Landscaping works at roadside amenity areas",
      checklist_start_day: "2021-10-23",
      checklist_end_day: "2023-01-03",
      checklist_project_id: 1,
    },
    {
      area: "construction of a sewage pumping station",
      description: "renew",
      checklist_start_day: "2022-4-11",
      checklist_end_day: "2022-12-11",
      checklist_project_id: 2,
    },
    {
      area: "manager room(cement)",
      description: "cement",
      checklist_start_day: "2022-5-24",
      checklist_end_day: "2022-6-10",
      checklist_project_id: 3,
    },
    {
      area: "manager room(electrician)",
      description: "electrician",
      checklist_start_day: "2022-6-5",
      checklist_end_day: "2022-6-12",
      checklist_project_id: 3,
    },
    {
      area: "manager room(paint)",
      description: "paint",
      checklist_start_day: "2022-6-12",
      checklist_end_day: "2022-6-25",
      checklist_project_id: 3,
    },
  ]);

  await knex("subcon_checklists").insert([
    { subcon_users_id: 3, checklists_id: 1 },
    { subcon_users_id: 4, checklists_id: 1 },
    { subcon_users_id: 2, checklists_id: 2 },
  ]);
  await knex("checklist_subitems").insert([
    {
      subitem_name: "fix drywall",
      subitem_description:
        "Before cutting out the damaged area of this how to fix drywall project, check the wall for obstructions. ",
      subitem_checklists_id: 1,
    },
    {
      subitem_name: "Repaint wall",
      subitem_description: "repaint the wall",
      subitem_checklists_id: 1,
    },
    {
      subitem_name: "Cement on the wall",
      subitem_description: "After the electrical engineering is completed",
      subitem_checklists_id: 1,
    },
    {
      subitem_name: "Repaint floor",
      subitem_description: "repaint the floor",
      subitem_checklists_id: 2,
    },
    {
      subitem_name: "Cement on the floor",
      subitem_description: "cement for the floor",
      subitem_checklists_id: 3,
    },
    {
      subitem_name: "Cement on the ceiling",
      subitem_description: "Cement on the ceiling",
      subitem_checklists_id: 3,
    },
    {
      subitem_name: "Cement on the wall",
      subitem_description: "Cement on the wall",
      subitem_checklists_id: 3,
    },
    {
      subitem_name: "organize electricity on the floor",
      subitem_description: "After the cement engineering is completed",
      subitem_checklists_id: 4,
    },
    {
      subitem_name: "organize electricity on the floor",
      subitem_description: "After the cement engineering is completed",
      subitem_checklists_id: 4,
    },
    {
      subitem_name: "paint on the ceiling",
      subitem_description: "paint on the ceiling ,white color #FFFFFF",
      subitem_checklists_id: 5,
    },
    {
      subitem_name: "paint on the wall",
      subitem_description: "paint on the wall ,pink color",
      subitem_checklists_id: 5,
    },
  ]);
}
