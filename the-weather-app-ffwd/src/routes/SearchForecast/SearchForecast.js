import Search from "./components/Search/Search";
import React, {useState} from 'react';
import ResultList from "./components/Results/ResultList";

function SearchForecast() {
    const [ weatherResults, setWeatherResults ] = useState([]);

    return (
        <div>
            <Search setWeatherResults={setWeatherResults}/>
            <ResultList weatherResults={weatherResults} />
        </div>
    );
}

export default SearchForecast;