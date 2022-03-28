import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faWind, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'

import { getCityDetailsForecast } from "../../requests/requests";
import Item from "../../Components/Item";
import FiveDayForecast from "./components/FiveDayForecast";


const LocationForecast = () => {
    const [ current, setCurrent ] = useState(null);
    const [ fiveDayForecast, setFiveDayForecast ] = useState(null)
    const location = useLocation();
    const [ geoLocation, setGeoLocation ] = useSearchParams();
    console.log('location', location);

    const lon = geoLocation.get('lon');
    const lat = geoLocation.get('lat');
    const city = geoLocation.get('city');
    const country = geoLocation.get('country');

    useEffect(() => {
        getCityDetailsForecast(lat, lon)
            .then(res => {
                setCurrent(res.data.current);
                setFiveDayForecast(res.data.daily);
            })
            .catch(console.error)
    }, [])

    return (
        <>
            <Link to="/"> back</Link>
            <Item
                elevation={2}
                style={{
                    width: 800,
                    marginTop: 30,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                {current &&
                    <div style={{ fontSize: '1.2rem' }}>
                        <div>{city}, {country}</div>
                        <img src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt="weather_icon"/>
                        <div>{ current.weather[0].main }</div>
                        <div><FontAwesomeIcon icon={faTemperatureThreeQuarters}/> { current.temp } &deg;C</div>
                        <div>Feels like { current.feels_like } &deg;C</div>
                        <div><FontAwesomeIcon icon={faWind} /> {current.wind_speed} km/h direction {current.wind_deg}&deg;</div>
                        <div>{ current.pressure } mbar</div>
                        <div><FontAwesomeIcon icon={faDroplet} /> { current.humidity }%</div>
                    </div>
                }
            </Item>
            <FiveDayForecast forecast={fiveDayForecast}/>
        </>
    );
};
export default LocationForecast;