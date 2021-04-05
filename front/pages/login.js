import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

import { Copyright, useStyles } from './loginStyle';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail, handleEmail] = useInput('');
    const [password, setPassword, handlePassword] = useInput('');
    const { loginUser, logInError, logInLoading } = useSelector((state) => state.user);

    const classes = useStyles();

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }

        if (loginUser) {
            Router.replace('/');
        }

    }, [loginUser, logInError])

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                email,
                password
            }
        })
    }, [email, password]);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VerifiedUserIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} validate='true' onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePassword}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={logInLoading}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item>
                            <Button disabled={logInLoading}>
                                <Link href="/register" variant="body2" disabled={logInLoading}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Login;