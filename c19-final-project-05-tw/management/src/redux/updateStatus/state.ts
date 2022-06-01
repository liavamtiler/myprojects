export interface IStatus {
 status:string

}

export const initStatus: IStatus = {
  status: "active",
};

export interface INumberOfCompletion{ 
  numberOfCompleted: number
}
export const initNumberOfCompletion: INumberOfCompletion={ 
  numberOfCompleted: 0
}
