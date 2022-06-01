import React from "react";
import BottomNavbar from "../components/BottomNavbar";
import styles from "../css/SubConCheckList.module.css";
import Navbar from "../components/Navbar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Bookmark, NoteAlt } from "@mui/icons-material";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { AdminCheckList } from "../components/AdminCheckList";


const CustomTextField = styled(TextField)`
    width:90%;
    color:#59677D;
`;

const CustomTitleTypography = styled(Typography)`
    color:#59677D;
`;

const CustomContentTypography = styled(Typography)`
    color:#111111;
    padding: 0px 5px 0px 5px;
`;

export const SubConChecklistPage = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      

      <div className={styles.background}>
      <Navbar />
        <Box sx={{ mr: "15px", ml: "15px", mb: "85px" }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap:"4px",
            mt:"10px",
            mb:"10px",
          }}>
            {/* DISABLED? Create Checklist Button */}
            <AdminCheckList />

            {/* <ProjectDetailButton /> */}

          </Box>

          {/* CHECKLIST */}
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  {/* Location */}

                  Checklist1=location1
                </Typography>
              </AccordionSummary>
              <AccordionDetails>

                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Type"
                      secondary=
                      // TYPE
                      "泥水"
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />

                </List>

                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <Button variant="contained" endIcon={<NoteAlt />} sx={{
                    margin: "10px auto 5px auto",
                    width: "65%",
                    bgcolor: "#022A54",
                  }}>
                    Subitem Page
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>


            {/* LOOP LIST */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Checklist2=location2</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Bookmark />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Type" secondary="泥水" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>

                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <Button variant="contained" endIcon={<NoteAlt />} sx={{
                    margin: "10px auto 5px auto",
                    width: "65%",
                    bgcolor: "#022A54",
                  }}>
                    Subitem Page
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>





          </div>
        </Box>
        <BottomNavbar />
      </div>
    </>
  );
};
