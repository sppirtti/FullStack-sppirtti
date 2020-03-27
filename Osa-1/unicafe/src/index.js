import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const all = clicks.good + clicks.bad + clicks.neutral

  const average = (clicks.good + (clicks.bad * (-1))) / all || 0

  const positive = clicks.good / all * 100 || 0



  const handlegoodClick = () =>
    setClicks({ ...clicks, good: clicks.good + 1 })

  const handleneutralClick = () =>
    setClicks({ ...clicks, neutral: clicks.neutral + 1 })

  const handlebadClick = () =>
    setClicks({ ...clicks, bad: clicks.bad + 1 })

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={handlegoodClick}>good</button>
        <button onClick={handleneutralClick}>neutral</button>
        <button onClick={handlebadClick}>bad</button>
      </div>
      <h1> Statistics </h1>
      <Statistics clicks={clicks} all={all} average={average} positive={positive} />
    </div>
  )
}


const Statistics = (props) => {
  return (
    <div>
      <div>good {props.clicks.good} </div>
      <div>neutral {props.clicks.neutral} </div>
      <div>bad {props.clicks.bad} </div>
      <div>all {props.all}</div>
      <div> average {props.average}</div>
      <div>positive {props.positive} %</div>
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))