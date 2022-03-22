import { useEffect, useState } from "react";
import axios from 'axios';
import Searchbar from './Searchbar'
import SearchResults from "./SearchResults";

function Search() {
    const [ searchbarValue, setSearchbarValue ] = useState('');
    const [ filteredLocations, setFilteredLocations ] = useState([]);
    const [ weather, setWeather ] = useState([]);

    const getWeather = (lat, lon) => {
        const weatherapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5101651a54e73f7552a5f0db477f33f0`

        return axios.get(weatherapi);
    }

    useEffect(() => {
        if (filteredLocations.length){
            const coordinates = filteredLocations.map((location) => {
                return {
                    lat: location.lat,
                    lon: location.lng,
                }
            })
            const requests = coordinates.map(coordinate =>
                getWeather(coordinate.lat, coordinate.lon)
            )

            Promise.all(requests)
                .then(res => {
                    const weatherData = res.map(locationWeather => locationWeather.data)
                    setWeather(weatherData)
                })
                .catch(console.log)
        }
    }, [ filteredLocations ])

    return (
        <>
            <Searchbar
                searchbarValue={searchbarValue}
                setSearchbarValue={setSearchbarValue}
                setFilteredLocations={setFilteredLocations}
                weather={weather}
                setWeather={setWeather}
            />
            <SearchResults
                searchbarValue={searchbarValue}
                weather={weather}
            />
        </>
    );
}

export default Search;