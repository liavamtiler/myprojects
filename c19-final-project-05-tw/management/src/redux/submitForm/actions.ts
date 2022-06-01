export const successWriteList=()=>{ 
  return { 
    type: "@@SUCCESS_WriteList" as const
  }
}



export const successWriteListSubitem=()=>{ 
  return { 
    type: "@@SUCCESS_WriteListSubitem" as const
  }
}
export const successAddProject=()=>{ 
  return { 
    type: "@@SUCCESS_addProject" as const
  }
}





export type WriteListAction= 
ReturnType< typeof successWriteList | typeof successWriteListSubitem>