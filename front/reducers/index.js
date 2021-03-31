import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import room from './room';

const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log('reducer>index>HYDRATE)', HYDRATE);
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    user,
    room,
});

export default rootReducer;