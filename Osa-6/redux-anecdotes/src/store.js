
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer

})



const store = createStore(
  reducer,
  composeWithDevTools()

)

anecdoteService.getAll().then(anecdotes =>

  store.dispatch(initializeAnecdotes(anecdotes))
)
   



export default store