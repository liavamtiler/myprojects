import { Request, Response } from "express";
import { CheckListService } from "../services/checkListService";

export class CheckListController {
  constructor(private CheckListService: CheckListService) {}

  /* Add Checklists */
  addList = async (req: Request, res: Response) => {
    const { pid } = req.params;
    const numberTypePid = Number(pid);

    try {
      const data = req.body.list;

      const result = await this.CheckListService.addList(data, numberTypePid);
      console.log(result);
      return res.status(200).json({ result: "SUCCESSFULly Insert" });
    } catch (e) {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
  };

  getAllList = async (req: Request, res: Response) => {
    try {
      const { cid } = req.params;
      const NumberCid = Number(cid);
      const ArrayList = await this.CheckListService.getAllList(NumberCid);

      if (ArrayList) {
        res.status(200).json(ArrayList);
        return;
      }
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };

  updateProgressCircle = async (req: Request, res: Response) => {
    try {
      const { progress, cid } = req.body;
      const result = await this.CheckListService.updateProgressCircle(
        progress,
        cid
      );

      res.status(200).json(result);
    } catch (e) {
      res.status(401).json({ Message: "Unsuccessful" });
    }
  };

  getSubItemImage = async (req: Request, res: Response) => {
    try {
      let subItemId = Number(req.params.sid);
      const images = await this.CheckListService.getSubitemImage(subItemId);
      res.json(images);
    } catch (e) {
      res.status(500).json("internal serve Error");
    }
  };

  uploadSubitemImage = async (req: Request, res: Response) => {
    try {
      let { subitem_id } = req.body;
      const imagePath = req.file;
      if (imagePath) {
        const result = await this.CheckListService.uploadSubitemImage(
          subitem_id,
          imagePath.filename
        );
        res.status(200).json(result);
        return;
      }
      res.status(400).end();
    } catch (e) {
      res.status(500).json("internal serve Error");
    }
  };
  deleteImage = async (req: Request, res: Response) => {
    try {
      const { imageId } = req.body;
      const result = await this.CheckListService.deleteImage(imageId);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json("internal serve Error");
    }
  };
}
