export interface CheckListField{
  area: string, 
  category: string,
  startDate:string, 
  endDate: string
}
export interface CheckListfields{
 lists : CheckListField[]
}

export interface WriteListState{
  isWrote: boolean
}
export const initWriteListState: WriteListState={
  isWrote:false
}


/* SUBITEM  MODAL */
export interface CheckListSubItemField{
  title: string, 
  description: string,
  company: string, 
  status :string,
  startDate:string, 
  endDate: string
  listId:number
}
export interface CheckListSubItemFields{
  SubItemLists : CheckListSubItemField[]
 }

export interface ProjectFields{ 
  id:number,
  title: string,
  projectCode: string,
  Location: string,
  contactPerson: string,
  type: string,
  EstimatedProjectCost: string,
  description: string,
  startDate: string,
  endDate: string,
}


export interface ProjectFieldsForMapLoop{ 
  id :number,
  title: string,
  projectcode: string,
  location: string,
  contactPerson: string,
  type: string,
  EstimatedProjectCost: string,
  project_description: string,
  start_day: string,
  end_day: string,
}
// contact_person: "Terrence"
// created_at: "2022-05-17T13:19:55.168Z"
// end_day: "2022-06-03T16:00:00.000Z"
// estimated_cost: "$1236,12"
// id: 1
// image_construction_plan: null
// location: "CWB"
// project_description: "build a school"
// project_status: "inProgress"
// projectcode: "C12345"
// start_day: "2022-05-25T16:00:00.000Z"
// title: "C1123"
// type: "undefined"
// updated_at: "2022-05-17T13:19:55.168Z"