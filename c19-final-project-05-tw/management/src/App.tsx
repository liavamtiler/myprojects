import "./App.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { restoreLoginThunk } from "./redux/auth/thunks";
import { IRootThunkDispatch } from "./redux/store";
import Routers from "./components/Routers";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch<IRootThunkDispatch>();

  useEffect(() => {
    dispatch(restoreLoginThunk(navigate));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routers />
    </>
  );
}
export default App;
