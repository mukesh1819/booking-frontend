import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';

useInterceptor(axios);

export function getPartnerServices(params){
    params = `q[partner_id_eq]=1`;
    return axios({
        method: 'get',
        url: `${API_URL}/partner_services?${params}`
    });
}