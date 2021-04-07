import produce from '../util/produce';

export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    uploadImageLoading: false,
    uploadImageDone: false,
    uploadImageError: null,
    uploadLoading: false,
    uploadDone: false,
    uploadError: null,
    updateRoomListLoading: false,
    updateRoomListDone: false,
    updateRoomListError: null,
    image: null,
    loginUser: null,
}


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_IN_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const UPLOAD_USERIMAGE_REQUEST = 'UPLOAD_USERIMAGE_REQUEST';
export const UPLOAD_USERIMAGE_SUCCESS = 'UPLOAD_USERIMAGE_SUCCESS';
export const UPLOAD_USERIMAGE_FAILURE = 'UPLOAD_USERIMAGE_FAILURE';


export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const UPDATE_ROOMLIST_REQUST = 'UPDATE_ROOMLIST_REQUEST';
export const UPDATE_ROOMLIST_SUCCESS = 'UPDATE_ROOMLIST_SUCCESS';
export const UPDATE_ROOMLIST_FAILURE = 'UPDATE_ROOMLIST_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = null;
            break;
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.loginUser = action.data;
            break;
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
            break;
        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
            break;
        case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.loginUser = null;
            break;
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break;
        case SIGN_UP_REQUEST:
            draft.signUpLoading = true;
            draft.signUpDone = false;
            draft.signUpError = null;
            break;
        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpDone = true;
            draft.signUpError = null;
            break;
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
        case UPLOAD_USERIMAGE_REQUEST:
            draft.uploadImageLoading = true;
            draft.uploadImageDone = false;
            draft.uploadImageError = null;
            break;
        case UPLOAD_USERIMAGE_SUCCESS:
            draft.uploadImageLoading = false;
            draft.uploadImageDone = true;
            draft.loginUser.imagePath = action.data;
            break;
        case UPLOAD_USERIMAGE_FAILURE:
            draft.uploadImageLoading = false;
            draft.uploadImageError = action.error;
            break;
        case UPLOAD_REQUEST:
            draft.uploadLoading = true;
            draft.uploadDone = false;
            draft.uploadError = null;
            break;
        case UPLOAD_SUCCESS:
            draft.uploadLoading = false;
            draft.uploadDone = true;
            draft.loginUser.name = action.data.name;
            draft.loginUser.phone = action.data.phone;
            draft.loginUser.introduce = action.data.introduce;
            break;
        case UPLOAD_FAILURE:
            draft.uploadLoading = false;
            draft.uploadError = action.error;
            break;
        case UPDATE_ROOMLIST_REQUST:
            draft.updateRoomListLoading = true;
            draft.updateRoomListDone = false;
            draft.updateRoomListError = null;
            break;
        case UPDATE_ROOMLIST_SUCCESS:
            draft.updateRoomListLoading = false;
            draft.updateRoomListDone = true;
            draft.loginUser.GameRoom = action.data;
            break;
        case UPDATE_ROOMLIST_FAILURE:
            draft.updateRoomListLoading = false;
            draft.updateRoomListError = action.error;
            break;
        default:
            break;
    }
});

export default reducer;