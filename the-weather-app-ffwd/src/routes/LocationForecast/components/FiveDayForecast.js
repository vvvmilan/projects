import React from 'react';

function FiveDayForecast({ forecast }) {
    console.log(`5d`, forecast)

    const fiveDayForecast = forecast?.slice(0, 5);
    console.log(fiveDayForecast)
    return (
        <>
            {
                fiveDayForecast && <div>5dayyyyyyyyyy</div>
            }
        </>

    );
}

export default FiveDayForecast;