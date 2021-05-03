import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Avatar, Container, Grid, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { Link, useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';

import useStyles from './registerStyles';
import axios from 'axios';
// import Navbar from '../Navbar';


const RegisterScreen = () => {

    const classes = useStyles();
    const history = useHistory();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [regNo, setRegNo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [half, setHalf] = useState(true);

    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const config = {headers: {"Content-Type": "application/json",}};
      
      try {
        const { data } = await axios.post( "/api/auth/register",
          {firstName, lastName, regNo, email, password, confirmPassword},config )
            console.log("register data", data);
            localStorage.setItem("authToken", data.token)
            setSuccess(data.message)
            setTimeout(() => {
              setSuccess('')
              history.push("/login");
            }, 5000);
       }catch (error) {
        console.log("error on catch:",error.response.data.message)
        setError(error.response.data.message);
        setTimeout(() => {
          setError('');
        }, 5000);
       }  
    }
  
    return (
      <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Register</Typography>
          { error && <Alert severity="error">{ error }</Alert>}
          { success && <Alert severity="success">{ success }</Alert>}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={half ? 6 : 12}>
                <TextField value={firstName} variant="outlined" size="small" autoFocus  fullWidth name="firstName" type="text" label="First Name"  onChange={(e) => setFirstName(e.target.value)} />
             </Grid>
              <Grid item xs={12} sm={half ? 6 : 12}>
                <TextField value={lastName} variant="outlined" size="small"  fullWidth name="lastName" type="text" label="Last Name"  onChange={(e) => setLastName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField value={email} variant="outlined" size="small"   fullWidth name="email" label="School Email Address" onChange={(e) => setEmail(e.target.value)} type="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={regNo} variant="outlined" size="small"   fullWidth name="regNo" label="Registration Number"  onChange={(e) => setRegNo(e.target.value)}type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={password} variant="outlined" size="small"   fullWidth name="password" label="Password"  onChange={(e) => setPassword(e.target.value)} type="password" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={confirmPassword} variant="outlined" size="small"  fullWidth name="confirmPassword" 
                label="Repeat Password"  onChange={(e) => setConfirmPassword(e.target.value)} type="password"
                /> 
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Register
            </Button>
            <div className="text-muted" >
                Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </Paper>
      </Container>
      </>
    )
    
}

export default RegisterScreen;
