import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IDashBoardProjectList } from "../interface/model";
import styles from "../css/DashBoardProjectList.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const DashBoardProjectList = ({
  title,
  projectId,
  projectCode,
  contactPerson,
  direct,
}: IDashBoardProjectList) => {
  const [searchContent, setSearchContent] = useState("");

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <List
          sx={{
            color: "white",
            width: "100%",
            border: 0.1,
            borderColor: "white",
            background: "transparent",
            margin: "15px 0px 5px 0px",
            borderRadius: "10px",
          }}
          className={styles.blur1}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Project" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              onClick={() => direct(projectId)}
              primary={title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                  >
                    {projectCode}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </ThemeProvider>
    </>
  );
};
