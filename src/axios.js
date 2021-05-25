import axios from 'axios';

// Base URL to make requests to the movie databbase
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

//example 
//instance.get('/foo');
//it will send  - https://api.themoviedb.org/3/foo

export default instance;