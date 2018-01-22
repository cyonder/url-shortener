import axios from 'axios';
import {
    ROOT_API_URL,
    CREATE_LINK,
    FETCH_LINK
} from '../constants';

export const createLinkSuccess = (link) => {
    return {
        type: CREATE_LINK,
        payload: link
    }
}

export const fetchLinkSuccess = (link) => {
    return {
        type: FETCH_LINK,
        payload: link
    }
}

export const fetchLinks = (callback) => {
    return dispatch => {
        return axios.get(`${ROOT_API_URL}/links`)
            .then(response => {
                callback(response.data);
            })
    }
}

export const fetchLink = (id, callback) => {
    return dispatch => {
        return axios.get(`${ROOT_API_URL}/links/${id}`)
            .then(response => {
                if(response.data.error){
                    // console.log(response.data.error);
                }else{
                    // console.log(response.data.original_url);
                    callback(response.data.original_url);
                }
            })
    }
}

export const createLink = (link, callback) => {
    return dispatch => {
        return axios.post(`${ROOT_API_URL}/links`, link)
            .then(response => {
                callback();
            })
    }
}
