import { useState } from "react"
import { Button } from "./Button"
import Statistics from "./Statistics"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalClick, setTotalClick] = useState(0)
  const [average, setAverage] = useState(0)
  const [totalAvg, setTotalAvg] = useState(0)

  const posPercent = `${((good / (good + neutral + bad)) * 100)} %`

  const setToGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)

    const updatedClick = totalClick + 1
    setTotalClick(updatedClick)
    
    const updatedAverage = average + 1
    setAverage(updatedAverage)
    setTotalAvg(updatedAverage / updatedClick)

    console.log('good feedback now', updatedGood)
    console.log('totalClick now', updatedClick)
  }

  const setToNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedClick = totalClick + 1
    setTotalClick(updatedClick)

    console.log('neutral feedback now', updatedNeutral)
    console.log('totalClick now', updatedClick)
  }

  const setToBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedClick = totalClick + 1
    setTotalClick(updatedClick)

    const updatedAverage = average - 1
    setAverage(updatedAverage)
    setTotalAvg(updatedAverage / updatedClick)
    
    console.log('bad feedback now', updatedBad)
    console.log('totalClick now', updatedClick)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={setToGood} text={'good'} />
      <Button handleClick={setToNeutral} text={'neutral'} />
      <Button handleClick={setToBad} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} totalAvg={totalAvg} totalClick={totalClick} posPercent={posPercent}/>
    </>
  )
}

export default App
