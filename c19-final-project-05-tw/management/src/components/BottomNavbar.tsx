import { Box } from "@mui/material";
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { Home, Event, WorkOutline, Forum, ManageAccounts } from "@mui/icons-material";
import React from "react";
import { styled } from '@mui/system';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";

const CustomButton = styled(ButtonUnstyled)`

  background-color: white;
  color: #59677D;
  padding: 2px 10px 2px 10px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #59677D;
    color: white;
  }

`;

const BottomNavbar = () => {
  const navigate = useNavigate()

  const directToUsersPage = () => {
    navigate("/users")
  }

  const userLayerName = useSelector(
    (state: IRootState) => state.auth.userLayerName
  );

  const directToHomePage = () => navigate("/");


  return (
    <Box sx={{
      position: "fixed",
      bottom: "10px",
      left: "0px",
      right: "0px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "5px",
      width: "95%",
      height: "35px",
      background: "#FFFFFF",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px 5px 5px 5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    }}>
      <CustomButton onClick={directToHomePage}><Home /></CustomButton>
      <CustomButton><WorkOutline /></CustomButton>

      {userLayerName === "admin" ? (
        <CustomButton><ManageAccounts onClick={directToUsersPage} /></CustomButton>
      ) : <CustomButton disabled><ManageAccounts /></CustomButton>}

    </Box >
  )
}

export default BottomNavbar;