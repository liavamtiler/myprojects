import React from "react";
import Navbar from "../components/Navbar";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";

import CreateForm from "../components/FormsButton";
import CheckList from "../components/CheckList";
import { projectInfo } from "../interface/model";

const CustomTextField = styled(TextField)`
  width: 90%;
  color: #59677d;
`;

const CustomTitleTypography = styled(Typography)`
  color: #59677d;
`;

const CustomContentTypography = styled(Typography)`
  color: #111111;
  padding: 0px 5px 0px 5px;
`;
type Anchor = "top";

export const ProjectInformation = ({
  title,
  projectCode,
  type,
  description,
  location,
  contactPerson,
  status,
  startDate,
  endDate,
}: projectInfo) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  return (
    <>
      <Navbar />

      <Box sx={{ mr: "15px", ml: "15px", mb: "85px" }}>
        <Box sx={{ padding: "5px" }}>
          <Box sx={{ mb: "10px" }}>
            <CustomTitleTypography variant="h6">
              Project Title
            </CustomTitleTypography>

            <CustomContentTypography>
              {/* Project title */}
              {title}
            </CustomContentTypography>
            <Divider></Divider>

            <CustomTitleTypography variant="h6">
              Project Code
            </CustomTitleTypography>
            <CustomContentTypography>
              {/*     Project Code*/}
              {projectCode}
              <Divider></Divider>
            </CustomContentTypography>
            <CustomTitleTypography variant="h6">
              Building type
            </CustomTitleTypography>
            <CustomContentTypography>
              {/* type */}
              {type}
            </CustomContentTypography>
            <Divider></Divider>

            <CustomTitleTypography variant="h6">
              Project Description
            </CustomTitleTypography>
            <CustomContentTypography>
              {/* Project Description */}
              {description}
            </CustomContentTypography>
            <Divider></Divider>
            <CustomTitleTypography variant="h6">Location</CustomTitleTypography>
            <CustomContentTypography>
              {/* Location */}
              {location}
            </CustomContentTypography>
            <Divider></Divider>
            <CustomTitleTypography variant="h6">
              Contact Person
            </CustomTitleTypography>
            <CustomContentTypography>
              {/* Contact Person */}
              {contactPerson}
            </CustomContentTypography>
            <Divider></Divider>
            <CustomTitleTypography variant="h6">Status</CustomTitleTypography>
            <CustomContentTypography>
              {/* project_status */}
              {status}
            </CustomContentTypography>
            <Divider></Divider>
            <CustomTitleTypography variant="h6">Schedule</CustomTitleTypography>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <CustomContentTypography>
                <Box flex={1}>
                  {/* Start Date */}
                  Start:{startDate}
                </Box>
              </CustomContentTypography>
              <CustomContentTypography>
                <Box flex={1}>
                  {/* Completion Date */}
                  Completion Date: {endDate}
                </Box>
              </CustomContentTypography>
            </Stack>
            <Divider></Divider>
            <CreateForm pathname={"projectDetail"} />
          </Box>
        </Box>
        {/* CHECKLIST */}

        <CheckList />
      </Box>
    </>
  );
};
