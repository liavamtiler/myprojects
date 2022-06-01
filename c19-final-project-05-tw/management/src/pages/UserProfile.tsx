import Navbar from "../components/Navbar";

import React from "react";
import styles from "../css/UserProfile.module.css";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import BottomNavbar from "../components/BottomNavbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CustomTitleTypography = styled(Typography)`
  color: #4bb0ff;
  width: 300px;
`;

const CustomContentTypography = styled(Typography)`
  color: #ffffff;
  padding: 5px 20px 5px 20px;
  width: 300px;
`;
type Anchor = "top";

export const UserInformation = () => {
  return (
    <>
      <div className={styles.background}></div>
      <Navbar />
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            textAlign: "center",
            border: "0.1px solid white",
            borderRadius: "15px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
          }}
          className={styles.blur1}
        >
          <h1>User Information</h1>

          <CustomTitleTypography variant="h6">User name:</CustomTitleTypography>
          <CustomContentTypography>
            Jacky
            <Divider></Divider>
          </CustomContentTypography>
          <CustomTitleTypography variant="h6">Company:</CustomTitleTypography>
          <CustomContentTypography>
            <Divider></Divider>
          </CustomContentTypography>

          <CustomTitleTypography variant="h6">Email:</CustomTitleTypography>
          <CustomContentTypography>
            jacky@aaacompany.com
            <Divider></Divider>
          </CustomContentTypography>

          <CustomTitleTypography variant="h6">Category:</CustomTitleTypography>
          <CustomContentTypography>
            electronic
            <Divider></Divider>
          </CustomContentTypography>
        </Box>
      </ThemeProvider>
      <BottomNavbar />
    </>
  );
};
