import axios from 'axios';
import {BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function createEmailChange(data){
    return axios({
        method: 'post',
        url: `${API_URL}/email_changes`,
        data: {email: data}
    });
}

export function email_confirm(id, data){
    return axios({
        method: 'patch',
        url: `${API_URL}/email_changes/${id}/confirm`,
        data: data
    });
}

export function email_reject(id, data){
    return axios({
        method: 'patch',
        url: `${API_URL}/email_changes/${id}/reject`,
        data: data
    });
}