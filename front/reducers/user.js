export const initialState = {
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const dummyUser = (data) => ({
    ...data,
    email: 'hsl5539',
    name: 'lee',
    id: 1,
    password: 1234,
    phone: '01064190539',
    Rooms: [{ id: 1 }],
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                signUpLoading: true,
                signUpDone: false,
                signUpError: false,
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
                signUpError: false,
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.error,
            }
        default: {
            return {
                ...state,
            }
        }
    }
}
export default reducer;