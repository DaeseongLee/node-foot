import produce from '../util/produce';

export const initialize = {
    makeLoading: false,
    makeDone: false,
    makeError: null,
    loadLoading: false,
    loadDone: false,
    loadError: null,
    roomDetailLoading: false,
    roomDetailDone: false,
    roomDetailError: null,
    RoomId: null,
    Rooms: [],
    RoomDetail: null,
    joinLoading: false,
    joinDone: false,
    joinError: null,
}

export const MAKE_ROOM_REQUEST = 'MAKE_ROOM_REQUEST';
export const MAKE_ROOM_SUCCESS = 'MAKE_ROOM_SUCCESS';
export const MAKE_ROOM_FAILURE = 'MAKE_ROOM_FAILURE';

export const LOAD_ROOMLIST_REQUEST = 'LOAD_ROOMLIST_REQUEST';
export const LOAD_ROOMLIST_SUCCESS = 'LOAD_ROOMLIST_SUCCESS';
export const LOAD_ROOMLIST_FAILURE = 'MAKE_ROOMLIST_FAILURE';

export const LOAD_ROOMDETAIL_REQUEST = 'LOAD_ROOMDETAIL_REQUEST';
export const LOAD_ROOMDETAIL_SUCCESS = 'LOAD_ROOMDETAIL_SUCCESS';
export const LOAD_ROOMDETAIL_FAILURE = 'MAKE_ROOMDETAIL_FAILURE';

export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST';
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
export const JOIN_ROOM_FAILURE = 'JOIN_ROOM_FAILURE';



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
            draft.RoomId = action.data;
            break;
        case MAKE_ROOM_FAILURE:
            draft.makeLoading = false;
            draft.makeError = action.error;
            break;
        case LOAD_ROOMLIST_REQUEST:
            draft.loadLoading = true;
            draft.loadDone = false;
            draft.loadError = null;
            break;
        case LOAD_ROOMLIST_SUCCESS:
            draft.loadLoading = false;
            draft.loadDone = true;
            draft.Rooms = action.data;
            break;
        case LOAD_ROOMLIST_FAILURE:
            draft.loadLoading = false;
            draft.loadError = action.error;
            break;
        case LOAD_ROOMDETAIL_REQUEST:
            draft.roomDetailLoading = true;
            draft.roomDetailDone = false;
            draft.roomDetailError = null;
            break;
        case LOAD_ROOMDETAIL_SUCCESS:
            draft.roomDetailLoading = false;
            draft.roomDetailDone = true;
            draft.makeDone = false;
            draft.RoomDetail = action.data;
            break;
        case LOAD_ROOMDETAIL_FAILURE:
            draft.roomDetailDone = false;
            draft.roomDetailError = action.error;
            break;
        case JOIN_ROOM_REQUEST:
            draft.joinLoading = true;
            draft.joinDone = false;
            draft.joinError = null;
            break;
        case JOIN_ROOM_SUCCESS:
            draft.joinLoading = false;
            draft.joinDone = true;
            draft.RoomId = action.data;
            break;
        case JOIN_ROOM_FAILURE:
            draft.joinLoading = false;
            draft.joinError = action.error;
            break;
        default:
            break;
    }
});

export default reducer;