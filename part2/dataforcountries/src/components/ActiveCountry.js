import React from 'react'
import Weather from './Weather'

const ActiveCountry= ({activeCountry,weather})=>{
    if (activeCountry===''){
        return null
    }
    const country = activeCountry
    const languages = country.languages
    const languageRows = languages.map(
        (language) => {
            return <li key={language.name}>{language.name}</li>
        }
    )

    return(
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {languageRows}
            </ul>
            <img width={'250px'} src={country.flag} alt={`${country.name}'s flag`}/>
            <h3>weather in {country.capital}</h3>
            <Weather weather={weather}/>
        </div>
    )
}

export default ActiveCountry