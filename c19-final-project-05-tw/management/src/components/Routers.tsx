import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import SignUpPage from "../pages/SignUpPage";
import RequireAuth from "./RequireAuth";
import ListFromProjectPage from "./CheckList";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";
import { SubItemsPage } from "../pages/SubItemsPage";
import { SubItemImagePage } from "../pages/SubItemImagePage";
import { AdminUserDashBoard } from "../pages/AdminUserDashBoard";
import { UserInformation } from "../pages/UserProfile";

export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROJECT: "/project/:fid",
  ADDCHECKLIST: "checklist",
  PROJECTDETAIL: "/projectDetail/:pid",
  SHOWCHECKLISTLIST: "/list",
  SUITEMSPAGE: "/subitems/:cid",
  SubConCheckList: "/subconchecklist",
  SUBITEMSPAGE: "/subitems/",
  SUBITEMIMAGE: "/subitemimage/:sid",
  CONTROLBOARD: "/users",
  USERINFO: "/userInfo",
};
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.SUBITEMSPAGE} element={<SubItemsPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PROJECTDETAIL} element={<ProjectDetailPage />} />
        <Route
          path={ROUTES.SHOWCHECKLISTLIST}
          element={<ListFromProjectPage />}
        />
        <Route path={ROUTES.SUITEMSPAGE} element={<SubItemsPage />} />
        <Route path={ROUTES.CONTROLBOARD} element={<AdminUserDashBoard />} />
        <Route path={ROUTES.SUBITEMIMAGE} element={<SubItemImagePage />} />
        <Route path={ROUTES.USERINFO} element={<UserInformation />} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};
export default Routers;
