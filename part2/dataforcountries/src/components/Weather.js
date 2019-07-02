import React from 'react'

const Weather = ({weather}) => {
    if (weather.current) {
        return (
            <>
                <p>
                    <strong>temperature: </strong>
                    {weather.current.temp_c} degrees celsius/
                    {weather.current.temp_f} degrees fahrenheit
                </p>
                <img alt={weather.current.condition.text} src={weather.current.condition.icon}/>
                <p>{weather.current.condition.text}</p>
                <p>
                    <strong>wind: </strong>{weather.current.wind_kph} kph direction {weather.current.wind_dir}
                </p>
            </>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}

export default Weather