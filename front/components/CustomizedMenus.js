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


import MakeRoom from './MakeRoom';

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
                    <ListItemText primary="로그아웃" onClick={handleClose} />
                </StyledMenuItem>
            </StyledMenu>
            <MakeRoom open={open} handleClose={handleClose} />
        </>
    );
}