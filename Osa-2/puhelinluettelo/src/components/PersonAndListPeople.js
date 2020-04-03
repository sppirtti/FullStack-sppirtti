import React from 'react'


const Person = ({person}) => { 

    return (

        <div >
            <p> {person.name} {person.number}

                <button onClick={() => { removePerson(person.id) }}>Delete</button>
            </p>
        </div>
    )
}


const ListPeople = (props) => {
    return (
        <div>
            {props.namesToShow.map((name) =>
                <Person key={name.name} person={name} onClick = {name.removePerson} />


            )}

        </div>
    )
}

export default ListPeople
