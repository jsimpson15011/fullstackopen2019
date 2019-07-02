import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountrySearchForm from './components/CountrySearchForm'
import Country from "./components/Country"
import ActiveCountry from "./components/ActiveCountry"

const App = () => {
    const [countryList, setCountryList] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])
    const [countrySearch, setCountrySearch] = useState('')
    const [activeCountry, setActiveCountry] = useState('')
    const [weather, setWeather] = useState({})

    useEffect(
        () => {
            axios.request('https://restcountries.eu/rest/v2/all')
                .then(
                    (response) => {
                        setCountryList(response.data)
                    }
                )
        }, []
    )
    useEffect(
        () => {
            if (activeCountry) {
                axios.request(`http://api.apixu.com/v1/current.json?key=4965e88fdfb746a288403642193006&q=${activeCountry.capital}`)
                    .then(
                        (response) => {
                            setWeather(response.data)
                        }
                    )
            }
        }, [activeCountry]
    )
    const handleCountrySearchChange = (event) => {
        setCountrySearch(event.target.value)
        const newFilteredCountryList = countryList.filter(
            (country) => {
                return (
                    country.name.toLowerCase().includes(event.target.value.toLowerCase())
                )
            }
        )
        setCountriesToShow(newFilteredCountryList)
        if (newFilteredCountryList.length === 1) {
            setActiveCountry(newFilteredCountryList[0])
        }
        else if (activeCountry) {
            setActiveCountry('')
        }
    }
    const handleShowCountryButton= (activeCountry)=>()=>{
        setActiveCountry(activeCountry)
    }
    const countryRows= ()=>{
        if (countriesToShow.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }
        else if (countriesToShow.length > 1) {
            return countriesToShow.map(
                (country)=>{
                    return(
                        <li key={country.numericCode}>
                        <Country

                            name={country.name}
                        />
                            <button onClick={handleShowCountryButton(country)}>show country</button>
                        </li>
                    )
                }
            )
        }
    }

    return (
        <div className="App">
            <CountrySearchForm value={countrySearch} onChange={handleCountrySearchChange}/>
            {countryRows()}
            <ActiveCountry weather={weather} activeCountry={activeCountry}/>
        </div>
    )
}

export default App
