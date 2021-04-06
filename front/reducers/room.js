import produce from '../util/produce';

export const initialize = {
    makeLoading: false,
    makeDone: false,
    makeError: null,
    loadLoading: false,
    loadDone: false,
    loadError: null,
    Rooms: null,
}

export const MAKE_ROOM_REQUEST = 'MAKE_ROOM_REQUEST';
export const MAKE_ROOM_SUCCESS = 'MAKE_ROOM_SUCCESS';
export const MAKE_ROOM_FAILURE = 'MAKE_ROOM_FAILURE';

export const LOAD_ROOMLIST_REQUEST = 'LOAD_ROOMLIST_REQUEST';
export const LOAD_ROOMLIST_SUCCESS = 'LOAD_ROOMLIST_SUCCESS';
export const LOAD_ROOMLIST_FAILURE = 'MAKE_ROOMLIST_FAILURE';


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
        default:
            break;
    }
});

export default reducer;