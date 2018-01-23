import axios from 'axios';

import { ROOT_API_URL, FETCH_LINKS } from '../constants';

export const fetchLinksSuccess = (links) => {
    return {
        type: FETCH_LINKS,
        payload: links
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

export const fetchLinks = () => {
    return dispatch => {
        return axios.get(`${ROOT_API_URL}/links`)
            .then(response => {
                dispatch( fetchLinksSuccess(response.data) );
            })
    }
}
