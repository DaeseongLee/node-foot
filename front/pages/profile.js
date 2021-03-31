import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

import AppLayout from '../components/AppLayout';
import Title from '../components/Title';


const useStyles = makeStyles((theme) => ({
    profile: {
        display: 'flex',
    },
    info: {
        marginRight: '2rem',
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
}))

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}


const Profile = () => {
    const classes = useStyles();
    return (
        <AppLayout>
            <div className={classes.profile}>
                <div className={classes.info}>
                    <Title>개인정보</Title>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="location"
                                name="location"
                                label="Location"
                                fullWidth
                                autoComplete="location"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="date"
                                name="date"
                                type="date"
                                label="Date"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="startTime"
                                name="startTime"
                                type="time"
                                label="StartTime"
                                defaultValue="00:00"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="toTime"
                                name="toTime"
                                type="time"
                                defaultValue="00:00"
                                label="ToTime"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="number"
                                name="number"
                                label="Number"
                                type="number"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="note"
                                name="note"
                                label="Note"
                                fullWidth
                                autoComplete="Note"
                            />
                        </Grid>
                    </Grid>
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