import axios from 'axios';

export default axios.create({
    // the request made to the api/v1/movies will be appended to this baseUrl
    baseURL: "http://localhost:8080",
    // baseURL:'https://a26e-110-235-234-65.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
});