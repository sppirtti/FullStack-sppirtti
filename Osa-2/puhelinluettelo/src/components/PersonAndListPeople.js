import React from 'react'

const Person = ({ person }) => {
    return (
        <p> {person.name} {person.number} </p>
    )
}


const ListPeople = (props) => {
    return (
        <div>
            {props.namesToShow.map((name) =>
                <Person key={name.name} person={name} />
            )}
        </div>
    )
}

export default ListPeople
