import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import Router from 'next/router';


import MakeRoom from './MakeRoom';
import { LOG_OUT_REQUEST } from '../reducers/user';

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

    const dispatch = useDispatch();
    const { logOutLoading } = useSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback((event) => {
        setAnchorEl(null);
        // setOpen(false);
    }, []);

    const handleProfile = useCallback(() => {
        setAnchorEl(null);
        // setOpen(false);
        Router.push('/profile');
    }, []);
    const handlelLogout = useCallback((event) => {
        setAnchorEl(null);
        // setOpen(false);

        dispatch({
            type: LOG_OUT_REQUEST,
        })

    }, []);

    const handleMakeRoomOpen = useCallback(() => {
        setAnchorEl(null);
        setOpen(true);
    }, []);


    return (
        <>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                className={classes.logo}
                onClick={handleClick}
                disabled={logOutLoading}
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

                <StyledMenuItem>
                    <ListItemIcon>
                        <PermIdentityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="내정보" onClick={handleProfile} />
                </StyledMenuItem>
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
                    <ListItemText primary="로그아웃" name='logout' onClick={handlelLogout} />
                </StyledMenuItem>
            </StyledMenu>
            <MakeRoom open={open} setClose={setOpen} />
        </>
    );
}