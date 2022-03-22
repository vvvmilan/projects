import React, {useState} from 'react';
import axios from 'axios';
import './Weather.css'

function Weather() {


    const [city, setLocation] = useState('')
    const [data, setData] = useState({})

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5101651a54e73f7552a5f0db477f33f0`


    const searchCity = (e) => {
        if (e.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation(``)
        }
    }

    const handleChange = (e) => {
        setLocation(e.target.value)
    }


    return (
        <div>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={ handleChange }
                    onKeyPress={ searchCity }
                    placeholder="Graaad"
                />
            </div>
            <div className="search-results">
                <div className="city">
                    {data.name}
                </div>
                <div className="temp">
                    {data.main
                        ? <h1>{ Math.round(data.main.temp * 10) /10 }°</h1>
                        : null
                    }
                </div>
                <div className="temp">
                    {data.main
                        ? <p>temperature from { Math.round(data.main.temp_min * 10) / 10 } to  { data.main.temp_max } o C, wind: { data.wind.speed } m/s; clouds: { data.clouds.all }; pressure: { data.main.pressure } hpa</p>
                        : null
                    }
                </div>
            </div>

        </div>
    );
}

export default Weather;

/*
coord
lon	-96.7836
lat	32.7668
weather
0
id	803
main	"Clouds"
description	"broken clouds"
icon	"04n"
base	"stations"
main
temp	285.68
feels_like	285.42
temp_min	282.36
temp_max	287.71
pressure	1004
humidity	93
visibility	10000
wind
speed	6.17
deg	300
clouds
all	75
dt	1647944272
sys
type	2
id	2036480
country	"US"
sunrise	1647952089
sunset	1647995984
timezone	-18000
id	4684904
name	"Dallas"
cod	200
 */