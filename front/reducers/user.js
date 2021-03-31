import produce from '../util/produce';

export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    loginUser: null,
}


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const dummyUser = (data) => ({
    ...data,
    email: 'hsl5539@gmail.com',
    name: 'lee',
    id: 1,
    password: 1234,
    phone: '01064190539',
    Rooms: [{ id: 1 }],
})

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
            draft.loginUser = dummyUser(action.data);
            break;
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
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
        default:
            break;
    }
});

export default reducer;