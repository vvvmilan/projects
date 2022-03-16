import React from 'react';
import {useState} from "react";
import './Searchbar.css';
function Searchbar() {

    const [city, setCity] = useState(`Brielle, Netherlands`);

    let handleChange = (e) => {
        setCity(e.target.value);
    }


    return (
        <div>
            <input
                type="text"
                className="searchbar"
                placeholder="Search for weather in..."
                onChange={ handleChange }
            />
            <div className="output">
                { city }
            </div>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/255px-Flag_of_the_Netherlands.svg.png" alt="Holland flag" width="100px"/>
            </div>
        </div>
    );
}

export default Searchbar;