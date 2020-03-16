import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError} from './apiUtils';


export function getPartners(params){
    return axios({
        method: 'get',
        url: `${API_URL}/partners`,
        params: params,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function showPartner(params){
    return axios({
        method: 'get',
        url: `${API_URL}/partners/:id`,
        params: params,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function createPartners(data){
    return axios({
        method: 'post',
        url: `${API_URL}/partners`,
        data: data,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function updatePartners(data){
    return axios({
        method: 'put',
        url: `${API_URL}/partners/:id`,
        data: data,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function deletePartners(params){
    return axios({
        method: 'delete',
        url: `${API_URL}/partners/:id`,
        params: params,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}