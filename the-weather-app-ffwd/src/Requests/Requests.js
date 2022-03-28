import axios from "axios";

const API_KEY = 'appid=5101651a54e73f7552a5f0db477f33f0';

const getWeather = (lat, lon) => {
    const weatherapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&${API_KEY}`

    return axios.get(weatherapi);
}

const getCityDetailsForecast = (lat, lon) => {
    const weatherapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&${API_KEY}`

    return axios.get(weatherapi);
}

export { getWeather, getCityDetailsForecast };
