import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import { ISubItems } from "../interface/model";
import styles from "../css/SubItemsPage.module.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { InputLabel } from "@material-ui/core";
import {
  changeStatusThunk,
  updateProgressThunk,
} from "../redux/updateStatus/thunks";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const SubItemsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subItem, setSubitem] = useState<Array<ISubItems>>([]);
  const { cid } = useParams();
  const [status, setStatus] = useState("");
  const [numberOfCompleted, setNumberOfCompleted] = useState(0);
  const [checlistId, setChecklistId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${REACT_APP_BACKEND_URL}/getSubitems/${cid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const result: Array<ISubItems> = await data.json();
      const percentOfCompleted =
        result.reduce(
          (acc, cur) => acc + (cur.subitem_status === "completed" ? 1 : 0),
          0
        ) / result.length;
      setSubitem(result);
      setNumberOfCompleted(percentOfCompleted * 100);
    };
    fetchData();
  }, [status, cid]);

  const directToImageUpload = (sid: number) => {
    navigate(`/subitemimage/${sid}`);
  };

  const onclickChagestatus = (status: string) => setStatus(status);
  const step = 100 / subItem.length;

  //@ts-ignore
  const handleChange = (event, itemId, checklistId) => {
    const status = event.target.value;
    setStatus(status);
    setChecklistId(checklistId);
    //@ts-ignore
    dispatch(changeStatusThunk(status, itemId));

    if (status === "completed") {
      setNumberOfCompleted((numberOfCompleted) => {
        const newNumberOfCompleted =
          numberOfCompleted >= 100 ? 100 : numberOfCompleted + step;

        // @ts-ignore
        dispatch(updateProgressThunk(newNumberOfCompleted, checklistId));
        return newNumberOfCompleted;
      });
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLayerName = useSelector(
    (state: IRootState) => state.auth.userLayerName
  );

  return (
    <>
      <div className={styles.background}></div>
      <Navbar />
      <Box p={2} sx={{ mb: "90px" }}>
        <ThemeProvider theme={darkTheme}>
          {/* LOOP START */}
          {subItem
            .sort((a, b) => a.id - b.id)
            .map((item) => (
              <React.Fragment key={item.id}>
                <Box sx={{ minWidth: 275, mb: "5px" }}>
                  <Card className={styles.blur1}>
                    <React.Fragment>
                      <CardContent
                        sx={{
                          border: "0.1px solid white",
                          borderBottom: "0px",
                          borderRadius: "5px 5px 0px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {/* SubCon Company Name */}

                          {/* Color Status */}
                          {item.subitem_status === "active" ? (
                            <FiberManualRecordIcon sx={{ color: "green" }} />
                          ) : item.subitem_status === "issue" ? (
                            <FiberManualRecordIcon sx={{ color: "yellow" }} />
                          ) : item.subitem_status === "completed" ? (
                            <CheckBoxIcon sx={{ color: "green" }} />
                          ) : null}
                        </Typography>
                        <Typography variant="h5" component="div">
                          {/* Subitem Name */}
                          {item.subitem_name}
                        </Typography>

                        <Typography variant="body2">
                          {/* Subitem Content */}
                          {item.subitem_description}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          border: "0.1px solid white",
                          borderTop: "0px",
                          borderRadius: "0px 0px 5px 5px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                          padding: "0px 16px 8px 16px",
                        }}
                      >
                        {userLayerName === "admin" ? (
                          <Box sx={{ maxWidth: 100 }}>
                            {/* Selection Status */}
                            <FormControl fullWidth>
                              <InputLabel
                                variant="standard"
                                htmlFor="uncontrolled-native"
                              ></InputLabel>
                              <NativeSelect
                                defaultValue={item.subitem_status}
                                onChange={(event) =>
                                  handleChange(
                                    event,
                                    item.id,
                                    item.subitem_checklists_id
                                  )
                                }
                              >
                                <option
                                  onChange={(event) =>
                                    handleChange(
                                      event,
                                      item.id,
                                      item.subitem_checklists_id
                                    )
                                  }
                                  value={"completed"}
                                >
                                  Completed
                                </option>
                                <option value={"issue"}>Issue</option>
                                <option value={"active"}>Active</option>
                              </NativeSelect>
                            </FormControl>
                          </Box>
                        ) : null}

                        <Button
                          size="small"
                          id="demo-positioned-button"
                          onClick={() => directToImageUpload(item.id)}
                          sx={{
                            borderRadius: "10px",
                            border: "1px solid black",
                            padding: "3px 15px 3px 15px",
                            bgcolor: "#022A54",
                            color: "white",
                            minWidth: "fit-content",
                            width: "55%",
                          }}
                        >
                          Subitem Image
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </React.Fragment>
            ))}
          {/* LOOP END */}
        </ThemeProvider>
        <BottomNavbar />
      </Box>
    </>
  );
};
