import axios from "axios";
import Box from '@mui/material/Box';
import cities from "cities.json";
import TextField from '@mui/material/TextField';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState } from "react";

import './Searchbar.css'

const isInputValid = (length, inputValue) => {
    return inputValue.length >= length;
}

const filterLocations = (name, inputLocation) => {
    const lowerCaseName = name.toLowerCase();
    const lowerCaseInputLocation = inputLocation.toLowerCase();

    return inputLocation.length === 2 || inputLocation.length === 3
        ? lowerCaseName === lowerCaseInputLocation
        : lowerCaseName.includes(lowerCaseInputLocation)
}

function Searchbar({
    setFilteredLocations,
    setSearchbarValue,
    setWeather,
    weather,
    searchbarValue,
                   }) {

    const handleChange = e => {
        let filterTimeout;
        const searchbarValue = e.target.value;
        clearTimeout(filterTimeout);
        setSearchbarValue(searchbarValue);

        filterTimeout = setTimeout(() => {
            if (isInputValid(2, searchbarValue)) {
                const filteredLocations = cities.filter(city => filterLocations(city.name, searchbarValue))
                setFilteredLocations(filteredLocations)
            } else {
                setFilteredLocations([])
            }
        }, 1000)
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            // setCurrentWeather(weather);
            setSearchbarValue(``);
            setWeather([])
        }
    }

    return (
        <div>
            <Box className="searchbarmui" sx={{ '& > :not(style)': { m: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TravelExploreIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" variant="standard"
                               label="Show weather in..."
                               onChange={ handleChange }
                               onKeyPress={ handleKeyPress }
                               value={ searchbarValue }
                    />
                </Box>
            </Box>
        </div>
    );
}

export default Searchbar;