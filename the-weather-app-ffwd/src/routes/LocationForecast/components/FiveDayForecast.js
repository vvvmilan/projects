import React from 'react';
import UniqueFiveDay from "./UniqueFiveDay";

const style = {
    display: 'flex',
    flexDirection: `row`,
    justifyContent: 'space-between',
    width: `50%`,
    margin: `20px auto`
}

function FiveDayForecast({ forecast }) {
    const fiveDayForecast = forecast?.slice(0, 5);
    // console.log(fiveDayForecast[0])


    return (
        <div style={style}>
            {
                forecast &&
                fiveDayForecast?.map((forecastInfo, index) =>
                    <UniqueFiveDay
                        key={index}
                        weather={forecastInfo}
                    />
                )
            }
        </div>
    );
}

export default FiveDayForecast;
