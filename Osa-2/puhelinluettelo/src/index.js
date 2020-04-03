import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PersonForm'
import ShowFilter from './components/ShowFilter'
import ListPeople from './components/PersonAndListPeople'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll] = useState(false)

 

  useEffect(() => {

    const eventHandler = response => {
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)

  }, [])
   

  const handleNewName = (event) => {
    console.log(event.target.value)

    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const morePeople = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === nameObject.name)) {
      alert(nameObject.name + " is already added to phonebook")

    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ShowFilter newFilter={newFilter} handleFilter={handleFilter} />

      <h2>Add A New Number</h2>
      <PersonForm newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} morePeople={morePeople} />

      <h2>Numbers</h2>
      <ListPeople namesToShow={namesToShow} />
    </div >
  )
}

export default App



ReactDOM.render(<App />, document.getElementById('root')) 