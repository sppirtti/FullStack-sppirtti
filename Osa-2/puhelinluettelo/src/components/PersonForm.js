import React from 'react'

const PersonForm = (props) => {
    return (
      <form onSubmit={props.morePeople}>
        <div>
          <p>
            name: <input value={props.newName} onChange={props.handleNewName} />
          </p>
          <p>
            number: <input value={props.newNumber} onChange={props.handleNewNumber} />
          </p>
  
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm