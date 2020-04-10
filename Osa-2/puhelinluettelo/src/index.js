import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PersonForm'
import ShowFilter from './components/ShowFilter'
import ListPeople from './components/PersonAndListPeople'
import './index.css'

import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll] = useState(false)
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
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

  const removePerson = (person) => {

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(leftPersons => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
      setMessage(`Removed succesfully!`)
      setClassName('added')
      setTimeout(() => {
        setMessage(null)
        setClassName(null)
      }, 5000)
    }

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
      if (window.confirm(`Update number for ${newName} ? `)) {
        const tmp = persons.find(tmp => tmp.name === newName)
        personService
          .update(tmp.id, nameObject)

          .then(response => {
            setPersons(persons.map(person => person.id !== tmp.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setMessage('Updated Succesfully!')
            setClassName('added')

            setTimeout(() => {
              setMessage(null)
              setClassName(null)
            }, 5000);
          })
          .catch(error => {
            setMessage('Person has been deleted!')
            setClassName('error')
            setTimeout(() => {
              setMessage(null)
              setClassName(null)
            }, 5000);
          })

      }

    } else {

      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      setMessage(
        `${newName} added succesfully!`
      )
      setClassName('added')
      setTimeout(() => {
        setMessage(null)
        setClassName(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} className={className} />

      <ShowFilter newFilter={newFilter} handleFilter={handleFilter} />

      <h2>Add A New Number</h2>

      <PersonForm newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} morePeople={morePeople} />



      <h2>Numbers</h2>

      <ListPeople namesToShow={namesToShow} removePerson={removePerson} />
    </div >
  )
}

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root')) 