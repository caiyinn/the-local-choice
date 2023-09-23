import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RouteHistory from "../Components/RouteHistory";
import Notification from "../Components/Notification";

const Login = () => {
  // notification
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
    // handle close snackbar
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
  };
  const postLogin = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: form,
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          console.log("Login successful");
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('role', response.data.user.role);
          console.log("test local storage",localStorage.getItem('user'));
          // console.log(response.data.token);
          console.log(response.data.user.role);
          if (response.data.user.role === "admin") {
            setSnackbarMessage('admin login successfully');
            setTimeout(() => {
              navigate("/config/stores");
            },3000);
          } 
          else {
            setSnackbarMessage(`${response.data.user.firstName} login successfully`);
            setTimeout(() => {
              navigate("/home");
            }
            ,3000);
          }
        }
        else{
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          setSnackbarMessage(`${response.data.message}`);
        }
      })
      .catch(function (error) {
        console.log(error);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setSnackbarMessage('login failed');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    setForm({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  useEffect(() => {
    if (form.email !== "" && form.password !== "") {
      postLogin();
    }
  }, [form]);

  return (
    <div>
      <RouteHistory page="login" routeName="login" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#414B3B",
            textDecoration: "none",
            margin: "20px 0px",
            fontSize: "26px",
            textAlign: "center",
          }}
        >
          Login
        </Typography>

        <div>
          <TextField
            required
            id="outlined-required"
            label="Email"
            name="email"
            defaultValue=""
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
          />
        </div>
        <Link to="/forgetpassword" style={{ textDecoration: "none" }}>
          <Typography
            variant="h7"
            noWrap
            sx={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Poppins",
              fontWeight: 500,
              color: "#75695A",
              fontSize: "14px",
              margin: "0px",
              "&:hover": {
                color: "#414B3B",
                cursor: "pointer",
              },
            }}
          >
            Forgot your password?
          </Typography>
        </Link>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#99958C",
            color: "#E4DCCD",
            width: "51ch",
            // marginRight:"130px",
            // marginLeft:"200px",
            marginTop: "30px",
            "&:hover": {
              backgroundColor: "#737373",
            },
          }}
        >
          Login
        </Button>
        <Typography
          variant="h7"
          noWrap
          sx={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#75695A",
            fontSize: "14px",
            margin: "10px",
          }}
        >
          <Box display="center" justifyContent="center" alignItems="center">
            <Typography
              variant="h7"
              noWrap
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#75695A",
                fontSize: "14px",
                margin: "5px",
              }}
            >
              Don't have an account?
            </Typography>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#75695A" }}
            >
              <Typography
                variant="h7"
                noWrap
                sx={{
                  "&:hover": {
                    color: "#414B3B",
                    cursor: "pointer",
                  },
                }}
              >
                Sign up
              </Typography>
            </Link>
          </Box>
        </Typography>
      </Box>
      <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>

    </div>
  );
};

export default Login;