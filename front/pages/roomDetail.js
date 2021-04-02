import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppLayout from '../components/AppLayout';
import Title from '../components/Title';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
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
    join: {
        marginRight: '1rem',
    },

}));

function createData(id, name, desc) {
    return { id, name, desc };
}

const rows = [
    createData(1, '고고고', '너한테는 패스안합니다'),
    createData(2, '나루토', '내가 에이스입니다'),
    createData(3, '사오나', '가나나다라마'),
    createData(4, '기기기기', '오키도키요'),
    createData(5, '기기기기', '오키도키요'),
    createData(6, '기기기기', '오키도키요'),
    createData(7, '기기기기', '오키도키요'),
    createData(8, '기기기기', '오키도키요'),
    createData(9, '기기기기', '오키도키요'),
    createData(10, '기기기기', '오키도키요'),
    createData(11, '기기기기', '오키도키요'),
    createData(12, '기기기기', '오키도키요'),
    createData(13, '기기기기', '오키도키요'),
    createData(14, '기기기기', '오키도키요'),
    createData(15, '기기기기', '오키도키요'),
    createData(16, '기기기기', '오키도키요'),
    createData(17, '기기기기', '오키도키요'),
    createData(18, '기기기기', '오키도키요'),

];

export default function FeaturedPost() {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:48rem)');
    const handleDelete = () => { alert('강퇴합니다') };
    return (
        <AppLayout>
            <div className={classes.roomDetail}>
                <div className={classes.roomInfo}>
                    <Title>방 상세정보</Title>
                    <Typography component="p" variant="h4">
                        장소:복현풋살장
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        날짜: 2021.03.28
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        시간: 20:00~22:00
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        총인원 : 18명
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        주의사항 : 늦지 않게 오세요
                    </Typography>
                </div>
                <div className={classes.list}>
                    <Title >참가자 명단</Title>
                    <div className={classes.grid} >
                        {rows.map(row =>
                            <div className={classes.item}>
                                <Chip className={classes.itemList} avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
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
                            className={classes.join}
                        >
                            참가하기
                    </Button>
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
