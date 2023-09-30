import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};

axios.defaults.baseURL = 'http://localhost:8080/hiringsystem/v1/auth';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const putHeader = () =>{
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }
    return headers;
}
export const request = (method, url, data) => {

    return axios({
        method: method,
        url: url,
        headers: putHeader(),
        data: data});
};
export const req= (method, url, data) => {

    return axios({
        method: method,
        url: url,
        data: data});
};
export const getter = (method,url) =>{

    return axios({
       method: method,
       url: url,
       headers: putHeader()
    });
}