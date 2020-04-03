import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'



const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    const eventHandler = response => {
      setCountries(response.data)
    }

    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)

  }, [])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }



  return (
    <div>
      <div>
       
        Find countries <input value = {newFilter} onChange= {handleFilter}/>
      </div>

      <div>
        {countries}
      </div>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))
