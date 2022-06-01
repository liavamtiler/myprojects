import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress variant="determinate" {...props} size="80px" />
      <Box
        sx={{
          bottom: "50%",
          right: "50% - 40px",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "white" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

//@ts-ignore
export default function CircularStatic({ listId, listPercentage }) {
  const changeToNumberType = Number(listPercentage);
  // const numberOfComplete = useSelector(
  //   (state: IRootState) => state.checkCompletion.numberOfCompleted
  // );
  // useEffect(() => {}, [numberOfComplete]);

  return <CircularProgressWithLabel value={changeToNumberType} />;
}
