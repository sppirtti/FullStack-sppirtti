import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

    case 'NEW_ANECDOTE':
      return (state.concat(action.data))

    case 'INIT_ANECDOTES':
      return action.data

    case 'VOTE':
      const id = action.data.id
      const anecdoteToLike = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToLike, votes: anecdoteToLike.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)

    default:
      return state
  }

}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

  export const voteAnecdote = (id,content,votes) => {
    return async dispatch => {
      await anecdoteService.update(id, content, votes + 1)
      dispatch({
        type: 'VOTE',
        data: { id },
      })
    }
  }


export default reducer