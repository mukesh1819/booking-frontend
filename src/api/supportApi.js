import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getFaqs(params){
    return axios({
      method: 'get',
      url: `${API_URL}/faqs?${params}`  
    });
}