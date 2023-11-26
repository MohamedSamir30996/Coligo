import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig/Coligo";
import Swal from "sweetalert2";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    passwordError: "",
    confirmPasswordError: "",
    emailError: "",
  });
  const emailRegex = /[a-z0-9]{5,}@[a-z]{3,}\.[a-z]{3,}/;

  function validation(event: React.ChangeEvent<HTMLInputElement>) {
    //title
    if (event.target.name === "name") {
      setUser({ ...user, name: event.target.value });
      setErrors({
        ...errors,
        nameError:
          event.target.value.length === 0 ? "This field is Required" : "",
      });
    } else if (event.target.name === "password") {
      setUser({ ...user, password: event.target.value });
      setErrors({
        ...errors,
        passwordError:
          event.target.value.length === 0
            ? "This field is Required"
            : event.target.value.length >= 4
            ? ""
            : "Use minimum 4 characters",
      });
    } else if (event.target.name === "confirmPassword") {
      setUser({ ...user, confirmPassword: event.target.value });
      setErrors({
        ...errors,
        confirmPasswordError:
          event.target.value.length === 0
            ? "This field is Required"
            : event.target.value === user.password
            ? ""
            : "Passwords don't match",
      });
    } else if (event.target.name === "email") {
      setUser({ ...user, email: event.target.value });
      setErrors({
        ...errors,
        emailError:
          event.target.value.length === 0
            ? "This field is Required"
            : emailRegex.test(event.target.value)
            ? ""
            : "Email Not Valid",
      });
    }
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      if (user.name && user.password && user.confirmPassword && user.email) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    } else {
      setDisable(false);
    }
  }, [errors, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(user.name && user.email && user.password && user.confirmPassword){

      const newUser = {
        username: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      };
      console.log(newUser);
      axiosInstance
        .get(`/users/email?email=${newUser.email}`)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              icon: "error",
              title: "Email Not Valid",
              text: "You can Log in, Email is already have an account...",
              showCancelButton: true,
              confirmButtonText: "Log in",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          } else {
            axiosInstance.post(`/users`, newUser);
            Swal.fire({
              icon: "success",
              title: "Account created",
              text: "You can Log in Now...",
              showCancelButton: true,
              confirmButtonText: "Log in",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
        setUser({
          name: "",
          password: "",
          confirmPassword: "",
          email: "",
        });
      setErrors({
        nameError: "",
        passwordError: "",
        confirmPasswordError: "",
        emailError: "",
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Missing Data",
        text: "Enter your username and password",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                value={user.name}
                onChange={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                onBlur={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                required
                fullWidth
                id="Username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                onBlur={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                onChange={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                onBlur={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                onChange={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                onBlur={(e) => validation(e as React.ChangeEvent<HTMLInputElement>)}
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
          
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider> 

  );
}