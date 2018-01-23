import { FETCH_LINKS } from '../constants';

export default function linkReducer(state = {}, action){
    switch(action.type){
        case FETCH_LINKS:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
