import React from 'react';
import moment from 'moment';
import Item from "../../../Components/Item";


const style = {
    padding: '5px',
}



function UniqueFiveDay({ key, weather }) {
    console.log(weather.dt)
    return (
        <Item
            key={key}
            elevation={2}
            style={style}
        >
            <div>{moment.unix(weather.dt).format("dddd")}</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather_icon"/>
            <div>min: {Math.round(weather.temp.min *10) /10} &deg;C</div>
            <div>max: {Math.round(weather.temp.max *10) /10} &deg;C</div>
        </Item>
    );
}

export default UniqueFiveDay;

/*

{
  "dt": 1648486800,
  "sunrise": 1648467122,
  "sunset": 1648511792,
  "moonrise": 1648460820,
  "moonset": 1648498800,
  "moon_phase": 0.87,
  "temp": {
    "day": 12.06,
    "min": 4.21,
    "max": 16.22,
    "night": 8.72,
    "eve": 14.61,
    "morn": 4.35
  },
  "feels_like": {
    "day": 10.26,
    "night": 8.72,
    "eve": 13.41,
    "morn": 2.13
  },
  "pressure": 1022,
  "humidity": 36,
  "dew_point": -2.25,
  "wind_speed": 3.76,
  "wind_deg": 336,
  "wind_gust": 9.91,
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "clouds": 51,
  "pop": 0,
  "uvi": 4.95
}

 */
