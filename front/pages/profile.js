import React, { useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UPLOAD_REQUEST, UPLOAD_USERIMAGE_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppLayout from '../components/AppLayout';
import Title from '../components/Title';




const useStyles = makeStyles((theme) => ({
    profile: {
        display: 'flex',
        justifyContent: 'center',
    },
    info: {
        marginRight: '2rem',
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    root: {
        maxWidth: 345,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#1769aa',
    },
    valid: {
        color: 'red',
    }
}))

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}


const Profile = () => {
    const dispatch = useDispatch();
    const { imageName, uploadLoading, loginUser } = useSelector(state => state.user);
    console.log('name', loginUser)
    const email = loginUser?.email;
    const [name, setName, handleName] = useInput(loginUser?.name);
    const [password, setPassword, handlePassword] = useInput(loginUser?.password);
    const [passwordConfirm, setPasswordConfirm, handlePasswordConfirm] = useInput(loginUser?.password);
    const [phone, setPhone, handlePhone] = useInput(loginUser?.phone);

    const [emptyError, setEmptyError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const classes = useStyles();
    const imageInput = useRef();



    const handleImageInput = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current],
    )

    const onChangeImages = useCallback((e) => {
        console.log('image', e.target.files);
        const imageFormData = new FormData();
        imageFormData.append('image', e.target.files[0]);
        // for (var key of imageFormData.keys()) {
        //     console.log('key', key);
        // }

        // for (var value of imageFormData.values()) {
        //     console.log('value', value);
        // }
        dispatch({
            type: UPLOAD_USERIMAGE_REQUEST,
            data: imageFormData,
        });

    }, [])

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setEmptyError(false);
        if (!(name && password && passwordConfirm && phone)) {
            return setEmptyError(true);
        };

        setPasswordError(false);
        if (password !== passwordConfirm) {
            return setPasswordError(true);
        };

        dispatch({
            type: UPLOAD_REQUEST,
            data: {
                email,
                name,
                password,
                phone,
            }
        })
    }, [name, password, passwordConfirm, phone])

    return (
        <AppLayout>
            <div className={classes.profile}>
                <div className={classes.info}>
                    <form noValidate onSubmit={handleSubmit}>
                        <input type="file" name="image" accept="image/*" id="raised-button-file" hidden ref={imageInput} onChange={onChangeImages} />
                        <Title>사용자정보</Title>
                        <Card className={classes.root}>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image="https://source.unsplash.com/random"
                                title="Contemplative Reptile"
                            />
                            <Button size="small" color="primary" onClick={handleImageInput}>이미지업로드</Button>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="name"
                                            name="name"
                                            label="Name"
                                            fullWidth
                                            autoComplete="name"
                                            defaultValue={name}
                                            onChange={handleName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            defaultValue={password}
                                            fullWidth
                                            onChange={handlePassword}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="passwordConfirm"
                                            name="passwordConfirm"
                                            type="password"
                                            label="PasswordConfirm"
                                            defaultValue={password}
                                            fullWidth
                                            onChange={handlePasswordConfirm}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            label="Phone"
                                            defaultValue={phone}
                                            fullWidth
                                            onChange={handlePhone}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={uploadLoading}
                                className={classes.submit}
                            >
                                Save
                            </Button>
                        </Card>
                    </form>
                    {emptyError && <div className={classes.valid}>입력되지 않은 사항이 있습니다.</div>}
                    {passwordError && <div className={classes.valid}>비밀번호와 비밀번호 확인이 다릅니다.</div>}
                </div>
                <div className={classes.roomList}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Title>방 참가 리스트</Title>
                            <div className={classes.demo}>
                                <List >
                                    {generate(
                                        <ListItem>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Single-line item"
                                            />
                                        </ListItem>,
                                    )}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </AppLayout>
    )
};

export default Profile;