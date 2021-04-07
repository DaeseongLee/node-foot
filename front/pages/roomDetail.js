import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppLayout from '../components/AppLayout';
import Title from '../components/Title';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ROOMDETAIL_REQUEST } from '../reducers/room';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
    roomDetail: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        width: '80%',
        margin: 'auto',
    },

    roomInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '1rem',
        marginRight: '1rem',
        width: '60%',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },


    },
    container: {
        marginBottom: '1rem',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    list: {
        width: '50%',
        marginLeft: '1rem',
        marginRight: '1rem',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginRight: '1rem',
        },
    },
    item: {
        width: '30%',
        marginBottom: '0.5rem',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        },
    },
    itemList: {
        width: '100%',
    },
    card: {
        display: 'flex',

    },
    cardMedia: {
        width: 160,

    },
    host: {
        backgroundColor: 'tomato',
    }

}));

export default function FeaturedPost() {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:48rem)');
    const handleDelete = () => { alert('강퇴합니다') };
    const { RoomId, RoomDetail } = useSelector(state => state.room);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_ROOMDETAIL_REQUEST,
            data: { id: RoomId.RoomId },
        })
    }, [RoomId])
    return (
        <AppLayout>
            <div className={classes.roomDetail}>
                <div className={classes.roomInfo}>
                    <Title>방 상세정보</Title>
                    <Typography component="p" variant="h4">
                        장소: {RoomDetail?.place}
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        날짜: {moment(RoomDetail?.date).format('yyyy-MM-DD')}
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        시간: {RoomDetail?.startTime} ~ {RoomDetail?.endTime}
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        총인원 : {RoomDetail?.number}명
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        주의사항 : {RoomDetail?.notice}
                    </Typography>
                </div>
                <div className={classes.list}>
                    <Title >참가자 명단</Title>
                    <div className={classes.grid} >
                        {RoomDetail?.Joiner.map(row =>
                            <div className={classes.item} key={row.id}>
                                <Chip className={RoomDetail?.roomMaker !== row.id ? classes.itemList : classes.host} avatar={<Avatar alt="Natacha" src={`http://localhost:3065/${row.imagePath}`} />}
                                    label={row.name}
                                    onDelete={handleDelete}

                                />
                            </div>
                        )}
                    </div>
                    <div className={classes.btn}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={false}
                        >
                            나가기 {' '}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
