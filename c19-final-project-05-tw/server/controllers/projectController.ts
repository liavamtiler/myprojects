import { Request, Response } from "express";
import { ProjectService } from "../services/projectServices";
import { logger } from "../utils/logger";

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  /* AddProjects */
  addProject = async (req: Request, res: Response) => {
    const subConArr = req.body.subConArr;

    try {
      const {
        title,
        projectCode,
        Location,
        contactPerson,
        type,
        EstimatedProjectCost,
        description,
        startDate,
        endDate,
      } = req.body;

      const result = await this.projectService.addProject(
        title,
        projectCode,
        Location,
        contactPerson,
        type,
        EstimatedProjectCost,
        description,
        startDate,
        endDate,
        subConArr
      );
      console.log(result);
      res.status(200).json({ message: "success" });
    } catch (e) {
      logger.info(e);
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };

  /* -----------------getProject----------------- */

  getProject = async (req: Request, res: Response) => {
    try {
      let projectArray = [];
      if (req.user.user_layer_name === "admin") {
        projectArray = await this.projectService.getProject();
      } else {
        projectArray = await this.projectService.getProjectByUserId(
          req.user.id
        );
      }

      res.status(200).json(projectArray);
      return;
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };

  getProjectInfo = async (req: Request, res: Response) => {
    try {
      const pid = Number(req.params.pid);
      const ProjectInfo = await this.projectService.getProjectInfo(pid);
      res.status(200).json(ProjectInfo);
      return;
    } catch (e) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      return;
    }
  };
}
