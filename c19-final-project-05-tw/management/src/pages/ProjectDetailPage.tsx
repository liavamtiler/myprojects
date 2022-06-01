import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProjectInfo } from "../interface/model";
import BottomNavbar from "../components/BottomNavbar";
import styles from "../css/ProjectDetailPage.module.css";
import ProjectDetailButton from "../components/ProjectDetailButton";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

export const ProjectDetailPage = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [ProjectInfo, setProjectInfo] = useState<Array<IProjectInfo>>([]);

  const [showList, setShowList] = useState(false);
  const param = useParams();
  const { pid } = param;

  useEffect(() => {
    setShowList(true);
    const fetchData = async () => {
      const data = await fetch(
        `${REACT_APP_BACKEND_URL}/getProjectInfo/${pid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await data.json();

      setProjectInfo(result);
    };
    fetchData();
  }, [pid]);

  return (
    <>
      <Navbar />
      <Box p={2} sx={{ marginBottom: "50%" }}>
        <div className={styles.background}></div>

        {ProjectInfo.map((project) => (
          <ProjectDetailButton
            key={project.id}
            title={project.title}
            projectCode={project.projectcode}
            type={project.type}
            description={project.project_description}
            location={project.location}
            contactPerson={project.contact_person}
            status={project.project_status}
            startDate={project.start_day}
            endDate={project.end_day}
          />
        ))}
      </Box>

      <BottomNavbar />
    </>
  );
};
