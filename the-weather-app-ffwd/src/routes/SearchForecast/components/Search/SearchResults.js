import ResultItem from './ResultItem'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    lineHeight: '25px',
}))

function SearchResults({ weather }) {
    return (
        <Item elevation={1} style={{
            backgroundColor: `#fff`,
            marginTop: 10,
            position: `absolute`,
            width: `100%`,
            zIndex: 1,}}>
            <div>
                {weather.map((weatherInfo, index) =>
                    <ResultItem
                        key={index}
                        weather={weatherInfo}
                    />)
                }
            </div>
        </Item>
    )
}

export default SearchResults;
