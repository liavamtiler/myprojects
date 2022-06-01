export interface Checklist {
  id: number;
  area: string;
  description: string;
  // category:string,
  // company: string,
  startDate: string /* might be changed */;
  endDate: string;
  progress_percentage: number;
}

export interface IProjectInfo {
  id: number;
  title: string;
  projectcode: string;
  location: string;
  contact_person: string;
  type: string /* might be changed */;
  estimated_cost: string;
  project_description: string;
  start_day: string;
  end_day: string;
  project_status: string;
}

export interface ISubItems {
  checklist_status: string;
  created_at: string;
  id: number;
  subitem_checklists_id: number;
  subitem_description: string;
  subitem_name: string;
  subitem_status: string;
}

export interface Iid {
  listId: number;
}

export interface IDashBoardProjectList {
  title: string;
  projectId: number;
  projectCode: string;
  contactPerson: string;
  direct: Function;
}

export interface IInputFields {
  area: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface IUsers {
  id: number;
  username: string;
  company: string;
  user_layers: string;
}

export interface ISubCon {
  id: number;
  company: string;
  user_layers: string;
}

export interface projectInfo {
  title: string;
  type: string;
  description: string;
  location: string;
  contactPerson: string;
  status: string;
  startDate: string;
  endDate: string;
  projectCode: string;
}

export interface listIdType {
  listId: number;
}
