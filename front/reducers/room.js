import produce from '../util/produce';

export const initialize = {
    makeLoading: false,
    makeDone: false,
    makeError: null,
    Rooms: null,
}

export const MAKE_ROOM_REQUEST = 'MAKE_ROOM_REQUEST';
export const MAKE_ROOM_SUCCESS = 'MAKE_ROOM_SUCCESS';
export const MAKE_ROOM_FAILURE = 'MAKE_ROOM_FAILURE';

const dummyRooms = (data) => {
    console.log('dummyRooms', data);
    return ({
        ...data,
        location: '복현풋살장',
        date: '2021-03-30',
        startTime: '09:00',
        endTime: '18:00',
        number: '16',
        notion: '늦지 않게 오세요'
    })
}

const reducer = (state = initialize, action) => produce(state, (draft) => {
    switch (action.type) {
        case MAKE_ROOM_REQUEST:
            draft.makeLoading = true;
            draft.makeDone = false;
            draft.makeError = null;
            break;
        case MAKE_ROOM_SUCCESS:
            draft.makeLoading = false;
            draft.makeDone = true;
            draft.Rooms = dummyRooms(action.data);
            break;
        case MAKE_ROOM_FAILURE:
            draft.makeLoading = false;
            draft.makeError = action.error;
            break;
        default:
            break;
    }
});

export default reducer;