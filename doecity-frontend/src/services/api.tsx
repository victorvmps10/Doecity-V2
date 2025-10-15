import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.15.114:3333'
});

/* 
const api = axios.create({
    baseURL: 'https://doecity-backend.onrender.com'
    baseURL: 'http://192.168.15.114:3333'
});
*/
export { api };