import { Knex } from "knex";
import { IChecklist } from "../models";
import { logger } from "../utils/logger";
export class CheckListService {
  constructor(private knex: Knex) {}

  /*------------AddChecklists ------------ */
  addList = async (data: Array<IChecklist>, pid: number) => {
    const toInsertData = data.map((item) => ({
      area: item.area,
      description: item.description,
      checklist_start_day: item.startDate,
      checklist_end_day: item.endDate,
      checklist_project_id: pid,
    }));
    return await this.knex
      .insert(toInsertData)
      .returning("id")
      .into("checklists");
  };

  /* ------------GetList------------ */
  getAllList = async (NumberCid: number) => {
    return (
      await this.knex.raw(`SELECT * FROM checklists where 
    checklist_project_id=${NumberCid}`)
    ).rows;
  };
  /* ------------updateListItem------------ */
  updateListItem = async () => {
    return (await this.knex.raw(`SELECT * FROM checklists`)).rows;
  };

  /* --------------updateProgressCircle------------ */
  updateProgressCircle = async (progress: number, cid: number) => {
    const result = (
      await this.knex.raw(
        /* sql */ `UPDATE checklists SET progress_percentage=? WHERE checklists.id =? returning *`,
        [progress, cid]
      )
    ).rows[0];
    logger.info("result from updateProgressCircle", result);
    return result;
  };

  uploadSubitemImage = async (subitem_id: number, image_path: string) => {
    const result = (
      await this.knex.raw(
        /* sql */ `INSERT INTO subitems_image_path (subitem_id,image_path) VALUES (${subitem_id},'${image_path}') returning id, image_path, status`
      )
    ).rows[0];
    return result;
  };

  getSubitemImage = async (subItemId: number) => {
    const result = (
      await this.knex.raw(
        /* sql */ `SELECT id, image_path, status FROM subitems_image_path WHERE subitem_id = ? ORDER BY id DESC`,
        [subItemId]
      )
    ).rows;
    return result;
  };

  // DELETE FROM students WHERE level < 15;
  deleteImage = async (deletedImageId: number) => {
    const result = (
      await this.knex.raw(
        /* sql */ `DELETE FROM subitems_image_path WHERE subitems_image_path.id = ? returning subitems_image_path.*`,
        [deletedImageId]
      )
    ).rows;
    return result;
  };
}
