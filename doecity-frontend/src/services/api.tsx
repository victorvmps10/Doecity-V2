import axios from "axios";

const api = axios.create({
    baseURL: 'https://doecity-backend.onrender.com'
});

export { api };
