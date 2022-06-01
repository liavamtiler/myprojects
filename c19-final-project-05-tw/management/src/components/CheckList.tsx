import React, { useEffect, useState } from "react";
import { Checklist } from "../interface/model";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNavigate, useParams } from "react-router-dom";
import SubItemButton from "./SubItemButton";

import styles from "../css/CheckList.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { NoteAlt } from "@mui/icons-material";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";

import CircularStatic from "./CicularProgress";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

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
/* Function component Below:  */
export default function CheckList() {
  const [searchContent, setSearchContent] = useState("");
  const [showList, setShowList] = useState(false);
  const [checklist, setChecklist] = useState<Array<Checklist>>([]);
  const param = useParams();
  const navigate = useNavigate();
  const { pid } = param;

  useEffect(() => {
    setShowList(true);
    const fetchData = async () => {
      const data = await fetch(`${REACT_APP_BACKEND_URL}/getAllList/${pid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      /* DEBUG */
      setChecklist(result);
    };
    fetchData();
  }, [pid]);

  /*  */
  const showSubItems = (cid: number) => {
    navigate(`/subitems/${cid}`);
  };
  const directToSubItemDetailPage = (cid: number) => {
    navigate(`/subitems/${cid}`);
  };
  const userLayerName = useSelector(
    (state: IRootState) => state.auth.userLayerName
  );

  return (
    <div className="searchBar">
      <Box sx={{ display: "flex", justifyContent: "center" }} mb={1}>
        <input
          className={styles.seach}
          type="text"
          placeholder="Seaching..."
          onChange={(event) => {
            setSearchContent(event.target.value);
          }}
        />
      </Box>

      {checklist
        .filter((list) => {
          if (searchContent === "") {
            return list;
          } else if (
            list.area.toLowerCase().includes(searchContent.toLowerCase())
          ) {
            return list;
          }
        })
        .map((list, key) => {
          return (
            <>
              <React.Fragment key={list.id}>
                <Accordion
                  sx={{
                    borderBottom: "1px solid white",
                    borderRadius: "5px",
                    color: "white",
                  }}
                  className={styles.blur1}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ color: "white" }}
                  >
                    <Typography>{list.area}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <List
                      sx={{
                        width: "100%",
                        padding: "0px",
                      }}
                    >
                      <CircularStatic
                        listPercentage={list.progress_percentage}
                        listId={list.id}
                      />

                      <ListItem>
                        <Divider></Divider>
                      </ListItem>
                      <Divider />
                    </List>

                    <Box
                      sx={{
                        display: "flex",
                        padding: "0px",
                        justifyContent: "space-between",
                      }}
                    >
                      {userLayerName === "admin" ? (
                        <SubItemButton listId={list.id} />
                      ) : null}
                      <Button
                        onClick={() => directToSubItemDetailPage(list.id)}
                        variant="contained"
                        endIcon={<NoteAlt />}
                        sx={{
                          fontSize: "10px",
                          margin: "10px auto 5px auto",
                          padding: "0px",
                          width: "45%",
                          height: "30px",
                          bgcolor: "#022A54",
                        }}
                      >
                        Subitems
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            </>
          );
        })}
    </div>
  );
}
