import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div key={anecdote.id}>

                <div>
                    {anecdote.content}
                </div>

                <div>
                    has {anecdote.votes}

                    <button onClick={handleClick}>vote</button>

                </div>

            </div>
        </li>
    )
}


const AnecdoteList = () => {
    
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(voteAnecdote(anecdote.id, anecdote.content, anecdote.votes))
                        dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
                    }
                    }
                />
            )}
        </ul>
    )
}

export default AnecdoteList

