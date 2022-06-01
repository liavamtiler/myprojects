import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { IUsers } from "../interface/model";
import styles from "../css/SubItemsPage.module.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { InputLabel } from "@material-ui/core";

import { changeUserLayer } from "../redux/updateStatus/thunks";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

export const AdminUserDashBoard = () => {
  const [userType, setUserType] = useState<IUsers[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${REACT_APP_BACKEND_URL}/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      setUserType(result);
    };

    fetchData();
  }, []);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    userId: number
  ) => {
    const userLayer = event.target.value;

    //@ts-ignore
    dispatch(changeUserLayer(userLayer, userId));
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className={styles.background}></div>
      <Navbar />
      <Box p={3} sx={{ mb: "50%" }}>
        <ThemeProvider theme={darkTheme}>
          {userType
            .sort((a, b) => a.id - b.id)
            .map((user) => (
              <>
                <Box key={user.id} sx={{ minWidth: 275, mb: "5px" }}>
                  <Card
                    sx={{ background: "transparent" }}
                    className={styles.blur1}
                  >
                    <React.Fragment>
                      <CardContent
                        sx={{
                          border: "0.1px solid white",
                          borderBottom: "0px",
                          borderRadius: "5px 5px 0px 0px",
                          padding: "15px 0px 0px 15px",
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
                          {user.company}
                        </Typography>
                        <Typography variant="h6">
                          {/* Subitem Name */}
                          {user.username}
                        </Typography>
                        <Typography color="text.secondary"></Typography>
                      </CardContent>

                      <CardActions
                        sx={{
                          border: "0.1px solid white",
                          borderTop: "0px",
                          borderRadius: "0px 0px 5px 5px",
                          display: "flex",
                          justifyContent: "right",
                          padding: "0px 5px 5px 0px",
                        }}
                      >
                        <Box>
                          {/* Selection Status */}
                          <FormControl fullWidth>
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                            ></InputLabel>
                            <NativeSelect
                              defaultValue={
                                user.user_layers ? user.user_layers : 0
                              }
                              onChange={(event) => handleChange(event, user.id)}
                              // inputProps={{
                              //   name: "age",
                              //   id: "uncontrolled-native",
                              // }}
                            >
                              <option value={0} disabled>
                                N/A
                              </option>
                              <option value={1}>Admin</option>
                              <option value={2}>Supervisor</option>
                              <option value={3}>Subcontractor</option>
                            </NativeSelect>
                          </FormControl>
                        </Box>

                        {/* Submit Request Button */}
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </>
            ))}
        </ThemeProvider>
      </Box>
    </>
  );
};
