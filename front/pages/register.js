import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import useInput from '../hooks/useInput.js';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Copyright, useStyles } from './registerStyle';
import { SIGN_UP_REQUEST } from '../reducers/user.js';

const Register = () => {
    const [email, setEmail, handleEmail] = useInput('');
    const [name, setName, handleName] = useInput('');
    const [password, setPassword, handlePassword] = useInput('');
    const [passwordConfirm, setConfirmPassword, handleConfirmPassword] = useInput('');
    const [phone, setPhone, handlePhone] = useInput('');
    const [check, setCheck] = useState(false);

    const [emptyError, setEmptyError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [checkError, setCheckError] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const { loginUser, signUpLoading, signUpError } = useSelector(state => state.user);

    useEffect(() => {
        if (loginUser) {
            alert('로그인된 상태이기때문에 메인페이지로 이동합니다')
            Router.push('/');
        }
        if (signUpError) {
            alert(signUpError);
        }
    }, [loginUser, signUpError])

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setEmptyError(false);
        if (!(email && name && password && passwordConfirm && phone)) {
            return setEmptyError(true);
        };

        setPasswordError(false);
        if (password !== passwordConfirm) {
            return setPasswordError(true);
        };

        setCheckError(false);
        if (!check) {
            return setCheckError(true);
        };

        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                email,
                name,
                password,
                phone,
            }
        })

    }, [email, name, password, passwordConfirm, phone, check]);

    const handleCheck = useCallback(() => {
        setCheck((prev) => !prev);
    }, [check]);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="name"
                                id="name"
                                autoComplete="name"
                                onChange={handleName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password_confirm"
                                label="PasswordConfirm"
                                type="password"
                                id="password_confirm"
                                autoComplete="current-password"
                                onChange={handleConfirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                type="phone"
                                id="phone"
                                autoComplete="phone"
                                onChange={handlePhone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" onChange={handleCheck} />}
                                label="활동 열심하겠습니다."
                            />
                        </Grid>
                    </Grid>
                    {emptyError && <div className={classes.valid}>입력되지 않은 사항이 있습니다.</div>}
                    {passwordError && <div className={classes.valid}>비밀번호와 비밀번호 확인이 다릅니다.</div>}
                    {checkError && <div className={classes.valid}>활동 열심히 한다고 체크 안할 겁니까?</div>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={signUpLoading}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item disabled={signUpLoading}>
                            <Button disabled={signUpLoading}>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Register;