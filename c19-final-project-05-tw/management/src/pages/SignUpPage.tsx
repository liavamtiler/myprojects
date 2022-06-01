import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styles from "../css/SignUpPage.module.css";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { IRootThunkDispatch } from "../redux/store";
import { signUpThunk } from "../redux/auth/thunks";
import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ROUTES } from "../components/Routers";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation/user";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CustomTextField = styled(TextField)`
  margin: 5px 20px 5px 20px;
  width: 300px;
`;

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<IRootThunkDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: any) => {
    const username = data["username"];
    const password = data["password"];
    const email = data["email"];
    const company = data["company"];

    dispatch(signUpThunk(username, password, email, company, navigate));
  };

  const directToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <div className={styles.background}></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={darkTheme}>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "100%",
              textAlign: "center",
              border: "0.1px solid white",
              borderRadius: "15px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "white",
            }}
            className={styles.blur1}
          >
            <h1>REGISTER</h1>

            <Box>
              <CustomTextField
                id="outlined-required"
                label="User Name"
                {...register("username", { required: true })}
              />
              {errors.username && <div>Incorrect Username or Password</div>}
              <CustomTextField
                id="outlined-password-input"
                label="Password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && <div>Incorrect Username or Password</div>}
              <CustomTextField
                id="outlined-required"
                label="Email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <div>Incorrect email form </div>}
              <CustomTextField
                id="outlined-required"
                label="Company"
                {...register("company", { required: true })}
              />
              {errors.company && <div>Incorrect company form </div>}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "200px",
                  height: "40px",
                  backgroundColor: "#424C5A",
                  color: "white",
                  mt: "15px",
                  mb: "10px",
                  "&:hover": {
                    backgroundColor: "#022A54",
                  },
                }}
              >
                CREATE ACCOUNT
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
              border: "0.1px solid white",
              borderRadius: "55px",
            }}
            className={styles.blur1}
          >
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => directToLogin()}
            >
              <Login />
            </IconButton>
          </Box>
        </ThemeProvider>
      </form>
    </>
  );
}
