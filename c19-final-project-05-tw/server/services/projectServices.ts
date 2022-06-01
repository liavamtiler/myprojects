import { Knex } from "knex";

export class ProjectService {
  constructor(private knex: Knex) {}

  /*------------ AddProject------------ */
  addProject = async (
    title: string,
    projectCode: string,
    Location: string,
    contactPerson: string,
    type: string,
    EstimatedProjectCost: string,
    description: string,
    startDate: string,
    endDate: string,
    subConArr: any
  ) => {
    const result = await this.knex
      .insert({
        title: `${title}`,
        projectcode: `${projectCode}`,
        location: `${Location}`,
        contact_person: `${contactPerson}`,
        type: `${type}`,
        estimated_cost: `${EstimatedProjectCost}`,
        project_description: `${description}`,
        start_day: `${startDate}`,
        end_day: `${endDate}`,
      })
      .returning("id")
      .into("projects");
    const addSubConsToProject = subConArr.map((subCon: any) => ({
      users_id: subCon,
      project_id: result[0]["id"],
    }));
    return await this.knex
      .insert(addSubConsToProject)
      .returning("id")
      .into("participant_list");
  };

  /* ------------getProject------------ */
  getProject = async () => {
    return (await this.knex.raw(`SELECT * FROM projects`)).rows;
  };

  getProjectByUserId = async (userId: number) => {
    const result = (
      await this.knex.raw(
        ` SELECT projects.* FROM participant_list INNER JOIN projects ON participant_list.project_id = projects.id where participant_list.users_id = ?`,
        [userId]
      )
    ).rows;

    return result;
  };
  /* ------------getProjectInfo------------ */

  getProjectInfo = async (pid: number) => {
    return (await this.knex.raw(`SELECT * FROM projects where id=${pid} `))
      .rows;
  };
}
