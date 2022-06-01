import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../components/Routers";
import styles from "../css/LoginPage.module.css";
import { loginThunk } from "../redux/auth/thunks";
import { IRootThunkDispatch } from "../redux/store";
import { PersonAddAlt } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { loginSchema } from "../validation/user";
import { yupResolver } from "@hookform/resolvers/yup";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export interface loginData {
  username: string;
  password: string;
}

const CustomTextField = styled(TextField)`
  margin: 5px 20px 5px 20px;
  width: 300px;
`;

export default function LoginPage() {
  const dispatch = useDispatch<IRootThunkDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: any) => {
    if (data.username && data.password) {
      const { username, password } = data;

      dispatch(loginThunk(username, password, navigate));
    }
  };
  const directToSignUp = () => {
    navigate(ROUTES.SIGNUP);
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
            <h1>WELCOME</h1>

            <Box>
              <CustomTextField
                id="outlined-required"
                label="User Name"
                {...register("username", {
                  required: "PLEASE INPUT YOUR USERNAME",
                })}
              />
              {errors.username && <div>Incorrect Username or Password</div>}

              <CustomTextField
                id="outlined-password-input"
                label="Password"
                type="password"
                {...register("password", {
                  required: "PLEASE INPUT YOUR PASSWORD",
                })}
              />
              {errors.username && <div>Incorrect Username or Password</div>}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "170px",
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
                LOGIN
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
              onClick={() => directToSignUp()}
            >
              <PersonAddAlt />
            </IconButton>
          </Box>
        </ThemeProvider>
      </form>
    </>
  );
}
