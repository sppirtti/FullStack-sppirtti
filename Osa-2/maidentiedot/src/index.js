
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import Info from './CountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {

    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }


  const handleClick = (event) => {
    setSearch(event.target.id)
  }


  const ShowCountries = countries.filter(country =>
    (country.name.toLowerCase().includes(search.toLowerCase())))

  return (
    <div>
      <div>
        {<Filter search={search}
          handleSearchChange={handleSearchChange} />}
      </div>
      <div>
        {<Countries ShowCountries={ShowCountries}
          handleClick={handleClick} />}
      </div>
    </div>
  )
}

const Country = ({ country, handleClick }) => {

  return (
    <div>
      <li>{country.name}<Button onClick={handleClick} id={country.name} /></li>
    </div>
  )
}



const Countries = ({ ShowCountries, handleClick }) => {

  if (ShowCountries.length > 10) {

    return (
      <div>
        Too many matches, Specify country name
      </div>
    )
  } if (ShowCountries.length === 0) {

    return (
      <div>
        No countries found
      </div>
    )
  }
  if (ShowCountries.length === 1) {

    return (
      ShowCountries.map(country =>
        <Info key={country.name} country={country} />)
    )
  } else {

    return (
      ShowCountries.map(country =>
        <Country key={country.name} country={country} handleClick={handleClick} />)
    )
  }
}


const Filter = ({ handleSearchChange, search }) => {

  return (
    <form onSubmit={handleSearchChange}>
      Find countries:
      <input value={search} onChange={handleSearchChange} />
    </form>
  )
}

const Button = ({ onClick, id }) => {
  return (
    <button onClick={onClick} id={id}>show</button>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))