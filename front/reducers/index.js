import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';

const rootReducer = combineReducers({
    index: (state = {}, action) => {
        console.log('(reducer>index>action)', action)
        switch (action.type) {
            case HYDRATE:
                console.log('reducer>index>HYDRATE)', HYDRATE);
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    user,
});

export default rootReducer;