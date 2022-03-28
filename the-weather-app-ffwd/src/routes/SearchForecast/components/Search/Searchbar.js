import axios from "axios";
import Box from '@mui/material/Box';
import cities from "../../../../../node_modules/cities.json/cities";
import TextField from '@mui/material/TextField';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

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
    setWeatherResults,
                   }) {
    let filterTimeout;
    const handleChange = e => {
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
        }, 500)
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            setWeatherResults(weather);
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