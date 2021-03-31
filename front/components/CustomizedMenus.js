import React, { useCallback, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    logo: {
        backgroundColor: 'transparent',
        marginRight: '0.5rem',
        '&:hover': {
            backgroundColor: '#10436b',
        }
    },
}));
const StyledMenu = withStyles({
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: '#1769aa',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomizedMenus() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStartTime, setStartTimeChange] = useState('');
    const [selectedToTime, setToTimeChange] = useState('');

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
        setOpen(false);
    }, []);


    const handleMakeRoomOpen = useCallback(() => {
        setAnchorEl(null);
        setOpen(true);
    }, []);

    const makeRoom = useCallback(() => { }, []);

    const handleDateChange = useCallback((date) => {
        console.log(date);
        setSelectedDate(date);
    }, []);

    const handleStartTimeChange = useCallback((time) => {
        console.log(time);
        setStartTimeChange(time);
    }, []);

    const handleToTimeChange = useCallback((time) => {
        console.log(time);
        setToTimeChange(time);
    }, []);
    console.log(new Date().getDate());
    return (
        <>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                className={classes.logo}
                onClick={handleClick}
            >
                <MenuIcon />
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link href="/profile" variant="body2">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <PermIdentityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="내정보" onClick={handleClose} />
                    </StyledMenuItem>
                </Link>
                <StyledMenuItem>
                    <ListItemIcon>
                        <MeetingRoomIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="방만들기 OR 방나가기" onClick={handleMakeRoomOpen} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="로그가웃" onClick={handleClose} />
                </StyledMenuItem>
            </StyledMenu>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">방만들기</DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취 소
                    </Button>
                    <Button onClick={makeRoom} color="primary">
                        방 생성
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}