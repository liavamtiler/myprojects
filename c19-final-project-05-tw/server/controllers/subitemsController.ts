import { Request, Response } from "express";
import { SubitemService } from "../services/subitemService";
import { logger } from "../utils/logger";
export class SubitemsController {
  constructor(private subitemsController: SubitemService) {}

  /* AddSubItem */
  addSubItem = async (req: Request, res: Response) => {
    try {
      logger.info(typeof req.body.listId, "CheckList's Req.body.ListiD");
      const insertData = req.body.subItems.map(
        (item: { title: string; description: string }) => ({
          subitem_name: item.title,
          subitem_description: item.description,
          subitem_checklists_id: req.body.listId,
        })
      );
      await this.subitemsController.addSubItem(insertData);
      res.status(200).json({ result: "SUCCESSFUL" });
      return;
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };

  getSubitems = async (req: Request, res: Response) => {
    try {
      const cid = Number(req.params.cid);
      const result = await this.subitemsController.getSubitems(cid);
      console.log("subitem", result);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };

  /* ---updateStatus ---*/
  updateStatus = async (req: Request, res: Response) => {
    try {
      const { status, itemId } = req.body;
      const numberItemId = Number(itemId);
      const result = await this.subitemsController.updateStatus(
        status,
        numberItemId
      );

      res.status(200).json(result);
      return;
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };
}
