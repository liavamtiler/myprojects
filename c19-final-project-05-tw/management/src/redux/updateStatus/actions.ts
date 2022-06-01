export const changeStatusSuccess = (id: number, status: string) => {
  return {
    type: "@@PROGRESS/CHANGE_SUCCESS" as const,
    id,
  };
};

export const updateCircularProgress = (numberOfCompleted: number) => {
  return {
    type: "@@PROGRESS/COMPLETED_SUCCESS" as const,
    numberOfCompleted,
  };
};

export type changeProgressAction =
  | ReturnType<typeof changeStatusSuccess>
  | ReturnType<typeof updateCircularProgress>;
// |typeof changeStatusFailchangeProgressAction
