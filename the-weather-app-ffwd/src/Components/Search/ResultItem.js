import { useState } from 'react'
import { countries } from 'countries-list'

const styles = {
    container: (isHighlighted) => isHighlighted
        ? {
            display: 'flex',
            flexDirection: `column`,
            backgroundColor: 'rgba(245,245,245, 255)',
            cursor: `pointer`,
            padding: `10px`,
            justifyContent: 'flex-start',
            borderBottom: `1px solid rgb(200,200,200)`,
        }
        : {
            display: 'flex',
            flexDirection: `column`,
            padding: `10px`,
            justifyContent: 'flex-start',
            borderBottom: `1px solid rgb(200,200,200)`,
        },
    label: {
        color: '#aaa',
        fontSize: '0.8rem',
        marginRight: 5,
    },
    info: {
        marginRight: `4px`,
        fontWeight: 500,
    },
    city: {
        fontWeight: 600,
        marginRight: `4px`
    },
    temp: {
        fontWeight: `500`,
        color: `#fff`,
        backgroundColor: `#6f6f6f`,
        padding: `1px 6px`,
        borderRadius: `20px`,
        margin: `0 5px`,
    }
}

const ResultItem = ({ key, weather }) => {
    const [ isHighlighted, setIsHighlighted ] = useState(false)
    const countryCode = weather.sys.country
    const country = countries[countryCode]

    const countryName = country.name
    const countryEmoji = country.emoji

    const handleMouseEnter = () => setIsHighlighted(true)
    const handleMouseLeave = () => setIsHighlighted(false)

    return (
        <div
            key={key}
            style={styles.container(isHighlighted)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <span style={styles.city}>{weather.name},</span>
                <span style={styles.info}>{countryName}</span>
                <span style={styles.info}>{countryEmoji}</span>
                <span style={styles.temp}>{ Math.round(weather.main.temp *10) /10 }	&deg;C </span>
                <span style={styles.label}>{weather.weather[0].description}</span>
            </div>

            <div>
                <span style={styles.label}>temperature</span>
                <span style={styles.info}>from { Math.round(weather.main.temp_min * 10) / 10 } &deg;C to { Math.round(weather.main.temp_max * 10) / 10 } &deg;C;</span>
                <span style={styles.label}>wind:</span>
                <span style={styles.info}>{weather.wind.speed} m/s;</span>
                <span style={styles.label}>clouds:</span>
                <span style={styles.info}>{weather.clouds.all}%;</span>
                <span style={styles.label}>pressure:</span>
                <span style={styles.info}>{weather.main.pressure} hpa</span>
            </div>
        </div>
    )
}

export default ResultItem;
