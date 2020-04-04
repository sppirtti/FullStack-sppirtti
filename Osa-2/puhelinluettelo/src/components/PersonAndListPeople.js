import React from 'react'

const Person = (props) => {

    return (

        <div >
            <p>
                {props.name} {props.number}
                <button onClick={props.removePerson} >Delete </button>
            </p>
        </div >
    )
}

const ListPeople = (props) => {

    return (
        <div>
            {props.namesToShow.map((person) =>
                <Person key={person.name} name={person.name} id={person.id} number={person.number} removePerson={() => props.removePerson(person)} />

            )}
        </div>
    )
}

export default ListPeople
