import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IRootState } from "../redux/store";

function RequireAuth() {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated === null) {
    return <></>;
  }

  if (isAuthenticated !== null && !isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default RequireAuth;
