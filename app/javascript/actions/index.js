import axios from 'axios';
import {
    ROOT_API_URL,
    CREATE_LINK
} from '../constants';

export const createLinkSuccess = (link) => {
    return {
        type: CREATE_LINK,
        payload: link
    }
}

export const createLink = (link) => {
    return dispatch => {
        return axios.post(`${ROOT_API_URL}/links`, link)
            .then(response => {
                // dispatch( createLinkSuccess(response.data) )
                console.log("Response Data: ", response.data);
            })
    }
}
