import React from 'react'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                Capital: {country.capital}
            </div>
            <div>
                Population: {country.population}
            </div>
            <h2>Languages</h2>
            {country.languages.map(language =>
                <li key={language.name}>{language.name}</li>)}
            <img src={country.flag} alt='flag' height="20%" width="20%" />
        </div>
    )
}

export default CountryInfo