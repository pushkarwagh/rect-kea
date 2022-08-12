import { useActions, useValues } from 'kea'
import { counterLogic } from './counterLogic'

function Counter() {
  const { increment, decrement } = useActions(counterLogic)
  const { counter, counterColor } = useValues(counterLogic)

  return (
    <div>
      <div style={{ display: "flex", color:`${counterColor}` }}>
        <h2> Counter: {counter}'sec </h2>
      </div>
      <button onClick={increment} disabled={counter > 10}>
        {' '}
        +1{' '}
      </button>
      <button onClick={decrement} disabled={counter < -4}>
        {' '}
        -1{' '}
      </button>
    </div>
  )
}

export default Counter
