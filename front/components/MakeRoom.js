import React, { useState, useCallback } from 'react';
import moment from 'moment';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';

import { MAKE_ROOM_REQUEST } from '../reducers/room';

const MakeRoom = ({ open, handleClose }) => {
    const [location, setlocation, handleLocation] = useInput('')
    const [date, setDate, handleDate] = useInput(moment().format('yyyy-MM-DD'))
    const [startTime, setStartTime, handleStartTime] = useInput(moment().format('HH:00'));
    const [endTime, setEndTime, handleEndTime] = useInput(moment().add(2, 'h').format('HH:00'));
    const [number, setNumber, handleNumber] = useInput(14);
    const [notion, setNotion, handleNotion] = useInput('');

    const dispatch = useDispatch();
    const makeRoom = useCallback(() => {
        dispatch({
            type: MAKE_ROOM_REQUEST,
            data: {
                location,
                date,
                startTime,
                endTime,
                number,
                notion
            }
        })

    }, [location, date, startTime, endTime, number, notion]);
    return (
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
                            onChange={handleLocation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="date"
                            name="date"
                            type="date"
                            label="Date"
                            defaultValue={date}
                            fullWidth
                            onChange={handleDate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="startTime"
                            name="startTime"
                            type="time"
                            label="StartTime"
                            defaultValue={startTime}
                            fullWidth
                            onChange={handleStartTime}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="endTime"
                            name="endTime"
                            type="time"
                            defaultValue={endTime}
                            label="EndTime"
                            fullWidth
                            onChange={handleEndTime}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="number"
                            name="number"
                            label="Number"
                            type="number"
                            defaultValue={number}
                            fullWidth
                            onChange={handleNumber}
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
                            onChange={handleNotion}
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
    )
};

// MakeRoom.propTypes = {
//     open: PropTypes.object.isRequired,
//     handleClose: PropTypes.object.isRequired,
// };

export default MakeRoom;