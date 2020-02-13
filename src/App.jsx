import React, { useState, useRef, useEffect } from 'react';

function useCounter(count) {
  return (
    <h1>{count}</h1>
  )
}

function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  const it = useRef

  useEffect(() => {
    it.current = setInterval(() => {
      setCount( count => count + 1);
    }, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(count >=10) {
      clearInterval(it.current)
    }
  })

  return [count, setCount]
}

function App(props) {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  return (
    <div>
      <button
        type="button"
        onClick={() => setCount(count+1)}
      >
        Add
      </button>
      <h1>{count}</h1>
      {Counter}
    </div>
  )
}

export default App;
