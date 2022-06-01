import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { IconButton, Stack } from "@mui/material";
import CheckList from "./CheckList";
import CreateForm from "./FormsButton";
import { Info } from "@mui/icons-material";
import styles from "../css/ProjectDetailButton.module.css";
import { useParams } from "react-router-dom";

const CustomTitleTypography = styled(Typography)`
  color: #59677d;
`;

const CustomContentTypography = styled(Typography)`
  color: #505050;
  padding: 0px 5px 0px 5px;
`;

type Anchor = "top";

export default function ProjectDetailButton(props: any) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const params = useParams();
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        bgcolor: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ p: "5px" }}>
        <CustomTitleTypography variant="h6">
          Project Title
        </CustomTitleTypography>

        <CustomContentTypography>
          {/* Project title */}
          {props.title}
        </CustomContentTypography>
        <Divider></Divider>

        <CustomTitleTypography variant="h6">Project Code</CustomTitleTypography>
        <CustomContentTypography>
          {/*     Project Code*/}
          {props.projectCode}
          <Divider></Divider>
        </CustomContentTypography>
        <CustomTitleTypography variant="h6">
          Building type
        </CustomTitleTypography>
        <CustomContentTypography>
          {/* type */}
          {props.type}
        </CustomContentTypography>
        <Divider></Divider>

        <CustomTitleTypography variant="h6">
          Project Description
        </CustomTitleTypography>
        <CustomContentTypography>
          {/* Project Description */}
          {props.description}
        </CustomContentTypography>
        <Divider></Divider>
        <CustomTitleTypography variant="h6">Location</CustomTitleTypography>
        <CustomContentTypography>
          {/* Location */}
          {props.location}
        </CustomContentTypography>
        <Divider></Divider>
        <CustomTitleTypography variant="h6">
          Contact Person
        </CustomTitleTypography>
        <CustomContentTypography>
          {/* Contact Person */}
          {props.contactPerson}
        </CustomContentTypography>
        <Divider></Divider>
        <CustomTitleTypography variant="h6">Status</CustomTitleTypography>
        <CustomContentTypography>
          {/* project_status */}
          {props.status}
        </CustomContentTypography>
        <Divider></Divider>
        <CustomTitleTypography variant="h6">Schedule</CustomTitleTypography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <CustomContentTypography>
            <Box flex={1}>
              {/* Start Date */}
              Start Date:{props.startDate}
            </Box>
          </CustomContentTypography>
          <CustomContentTypography>
            <Box flex={1}>
              {/* Completion Date */}
              Completion Date:{props.endDate}
            </Box>
          </CustomContentTypography>
        </Stack>
      </List>
    </Box>
  );

  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          left: "5%",
          bottom: "20%",
          borderRadius: "55px",
        }}
      >
        {(["top"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              aria-label="delete"
              size="large"
              className={styles.display}
              onClick={toggleDrawer(anchor, true)}
            >
              <Info />
            </IconButton>

            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </Box>
      <CreateForm pathname={"projectDetail"} />

      <CheckList />
    </div>
  );
}
