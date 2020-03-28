import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {


  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))

  const handlerandomClick = () =>
    setSelected(Math.floor(Math.random() * 6))

  const [points, setPoints] = useState(Array(6).fill(0))


  const handlevoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const suurin = Math.max(...points)
  const listanArvo = points.indexOf(Math.max(...points));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div> {props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>


      <div>
        <Button onClick={handlevoteClick} text="Vote" />

        <Button onClick={handlerandomClick} text="Next Anecdote" />
      </div>

      <h1> Anecdote with most votes</h1>
      <div>
        {props.anecdotes[listanArvo]}
        <div> has {suurin} votes</div>

      </div>
      <div>

      </div>

    </div>

  )
}




const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>

)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)