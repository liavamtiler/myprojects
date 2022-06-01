import { Knex } from "knex";
export class SubitemService {
  constructor(private knex: Knex) {}

  /* ------------AddSubItem------------ */
  addSubItem = async (
    data: {
      subitem_name: string;
      subitem_description: string;
      subitem_checklists_id: number;
    }[]
  ) => {
    return await this.knex
      .insert(data)
      .returning("id")
      .into("checklist_subitems");
  };

  /* ----------getSubitems-------- */

  getSubitems = async (cid: number) => {
    return (
      await this.knex.raw(
        /*sql*/ `SELECT * FROM checklist_subitems WHERE subitem_checklists_id=${cid} `
      )
    ).rows;
  };
  /* ---------updateStatus--------- */

  updateStatus = async (status: string, itemId: number) => {
    const result = (
      await this.knex.raw(
        /*sql*/ `UPDATE checklist_subitems SET subitem_status=? WHERE checklist_subitems.id =? returning *`,
        [status, itemId]
      )
    ).rows[0];
    return result;
  };
}
