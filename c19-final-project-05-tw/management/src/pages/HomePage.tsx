import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashBoardProjectList } from "../components/DashBoardProjectList";
import CreateForm from "../components/FormsButton";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { ProjectFieldsForMapLoop } from "../redux/submitForm/state";
import Navbar from "../components/Navbar";
import styles from "../css/SubItemsPage.module.css";
import BottomNavbar from "../components/BottomNavbar";
import { Box } from "@mui/material";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

export default function HomePage() {
  const location = useLocation();

  const userLayerName = useSelector(
    (state: IRootState) => state.auth.userLayerName
  );
  const [projects, setProjects] = useState<Array<ProjectFieldsForMapLoop>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${REACT_APP_BACKEND_URL}/getAllProjects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      setProjects(result);
    };
    fetchData();
  }, []);

  const directToProjectDetail = (pid: number) => {
    navigate(`/projectDetail/${pid}`);
  };
  return (
    <>
      <div className={styles.background}></div>
      <Navbar />

      {userLayerName === "admin" ? (
        <CreateForm pathname={location.pathname} />
      ) : null}

      <Box sx={{ padding: "10px", marginBottom: "50%" }}>
        {projects.map((project) => (
          <DashBoardProjectList
            key={`project_${project.id}`}
            title={project.title}
            projectId={project.id}
            projectCode={project.projectcode}
            contactPerson={project.contactPerson}
            direct={directToProjectDetail}
          />
        ))}
      </Box>

      <BottomNavbar />
    </>
  );
}
