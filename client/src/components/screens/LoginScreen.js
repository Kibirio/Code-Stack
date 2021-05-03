import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Avatar, Container, Grid, TextField } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';

import useStyles from './registerStyles';
import axios from 'axios';


const LoginScreen = ({ history }) => {
  const classes = useStyles();
  const location  = useLocation();
  
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/auth/login"
    const payload = {password, regNo}
    const config = {headers: {"Content-Type": "application/json"}}

    try {
      const { data } = await axios.post(url, payload, config);
      // console.log('login data:', data)
      // console.log('login data:', data.user.email)
      localStorage.setItem("authToken", data.token);
      setSuccess(data.message);
      setTimeout(() => {
        setSuccess("");
        history.push("/");
      }, 5000);
    } catch (error) {
      console.log("error login:", error)
      setError(error.response.data.error)
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Login</Typography>
          { error && <Alert severity="error">{ error }</Alert>}
          { success && <Alert severity="success">{ success }</Alert>}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField value={regNo} variant="outlined" size="small"   fullWidth name="regNo" label="Registration Number" onChange={(e) => setRegNo(e.target.value)} type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={password} variant="outlined" size="small"   fullWidth name="password" label="Password"  onChange={(e) => setPassword(e.target.value)}type="password" />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Login
            </Button>
            <Grid container justify="">
              <div variant="" className="text-muted text-right text-sm mb-3">
                Don't have an account?<Link to="/register"> Register</Link>
              </div>
            </Grid>
            
            <Grid container justify="">
              <div variant="" className="text-muted text-right text-sm">
                <Link to="/forgotpassword">I forgot password</Link>
              </div>
            </Grid>
            
          </form>
        </Paper>
      </Container>
    )
}

export default LoginScreen

// endAdornment= {
                    // <InputAdornment position="end">
                    //   <IconButton onClick={handleShowPassword}>
                    //     {showPassword ? <Visibility /> : <VisibilityOff />}
                    //   </IconButton>
                    // </InputAdornment>
                // }