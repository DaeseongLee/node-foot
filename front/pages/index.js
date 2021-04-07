import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import moment from 'moment';

import { LOAD_ROOMLIST_REQUEST } from '../reducers/room';
import AppLayout from '../components/AppLayout';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from 'next/link';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Home() {
    const classes = useStyles();
    const { loginUser } = useSelector(state => state.user);
    const { Rooms, makeDone } = useSelector(state => state.room);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loginUser) {
            Router.replace('/login');
        }
        dispatch({
            type: LOAD_ROOMLIST_REQUEST,
        })
    }, [loginUser]);

    useEffect(() => {
        if (makeDone) {
            Router.replace('/roomDetail');
        }
    }, [makeDone]);

    return (
        <AppLayout>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {Rooms && Rooms.map((room) => (
                            <Grid item key={room.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={`https://source.unsplash.com/random/${room.id}/?soccer`}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            장소: {room.place}
                                        </Typography>
                                        <Typography>
                                            날짜: {moment(room.date).format('yyyy-MM-DD')}
                                        </Typography>
                                        <Typography>
                                            시간: {room.startTime} ~ {room.endTime}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link href="/roomDetail">
                                            <Button size="small" color="primary" >
                                                참가하기
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                 </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Welcome
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </AppLayout>
    );
}