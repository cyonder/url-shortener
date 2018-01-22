import {
    CREATE_LINK,
    FETCH_LINK
} from '../constants';

const initialState = {
    link: null,
}

export default function linkReducer(state = initialState, action){
    switch(action.type){
        case FETCH_LINK:
            return {...state, link: action.payload}
        default:
            return state;
    }
}
