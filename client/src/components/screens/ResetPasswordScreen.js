import { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Paper, Avatar, Container, Grid, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';

import useStyles from './registerStyles';

const ResetPasswordScreen = ({ match, history }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const classes = useStyles();

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const url = `/api/auth/resetpassword/${match.params.resetToken}`;
        const config = { headers: { "Content-Type": "application/json" } };
                
        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setError("Passwords do not match")
            setTimeout(() => {
                setError("")
            }, 5000);
        }
        if (!password || !confirmPassword) {
          setError("Please fill the empty fields ")
          setTimeout(() => {
              setError("")
          }, 5000);
      }
        try {
            const { data } = await axios.put(url, { password }, config);
            setSuccess(data.message);
            setTimeout(() => {
              setSuccess("");
              history.push("/login")
          }, 10000);
        } catch (error) {
            setError(error.response.data.error);
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
          <Typography component="h1" variant="h5">Reset Password</Typography>
          { error && <Alert severity="error">{ error }</Alert>}
          { success && <Alert severity="success">{ success }</Alert>}
          <form className={classes.form} onSubmit={resetPasswordHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField value={password} variant="outlined" size="small"  fullWidth name="password" label="New Password"  onChange={(e) => setPassword(e.target.value)} type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField value={confirmPassword} variant="outlined" size="small"  fullWidth name="confirmPassword" label="Confirm New Password"  onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
            </Grid>
          </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Reset Password
            </Button>
          </form>
        </Paper>
      </Container>
    )
}

export default ResetPasswordScreen
