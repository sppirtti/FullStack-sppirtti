import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PersonForm'
import ShowFilter from './components/ShowFilter'
import ListPeople from './components/PersonAndListPeople'

import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })

  }, [])


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const removePerson = (id) => {
    personService
    .remove(id)
    .getAll()
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

      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
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
      <ListPeople namesToShow={namesToShow} removePerson = {removePerson} />
    </div >
  )
}


ReactDOM.render(<App />, document.getElementById('root')) 