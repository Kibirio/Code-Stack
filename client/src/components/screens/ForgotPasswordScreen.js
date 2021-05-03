import { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Paper, Avatar, Container, Grid, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';


import useStyles from './registerStyles';

const ForgotPasswordScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const classes = useStyles();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const url = "/api/auth/forgotpassword";
        const config = { headers: { "Content-Type": "application/json" } };

        try {
            const { data } = await axios.post(url, { email } , config);
            setSuccess(data.message);
            history.push("/login");
            setTimeout(() => {
                setSuccess("");
                setEmail("");
            }, 5000);
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
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
                <Typography className="text-muted">Please provide the email 
                    addrees you used to register and reset password link will be sent to you.
                </Typography>
                { error && <Alert severity="error">{ error }</Alert>}
                { success && <Alert severity="success">{ success }</Alert>}
                <form className={classes.form} onSubmit={handleForgotPassword}>
                    <Grid item xs={12}>
                        <TextField value={email} variant="outlined" size="small"  fullWidth name="email" label="Email"  onChange={(e) => setEmail(e.target.value)} type="email" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Submit
                    </Button>                
                </form>
            </Paper>
      </Container>
    )
}

export default ForgotPasswordScreen
