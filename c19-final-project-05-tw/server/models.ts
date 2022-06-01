export interface User {
  id: number;
  username: string;
  password: string;
  phone?: any;
  email?: any;
  company: string;
  category_id: number;
  user_layers: number;
  user_layer_name: string;
}


export interface IChecklistFrom{ 
  area:string, 
  description:string, 
  startDate:string, 
  endDate:string


}

export interface IChecklist{
  area: string,
  description: string,
  startDate: string,
  endDate: string,
  pid: number
  }