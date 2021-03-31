import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'WELCOME '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#1769aa',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#1769aa',
    },
}));