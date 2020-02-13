import React, { useState, useRef, useEffect, useCallback } from 'react';

function useCounter(count) {
  const size = useSize()
  return (
    <div>
      <h1>{`${size.width}x${size.height}`}</h1>
      <h1>{count}</h1>
    </div>
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

function useSize(params) {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return size
}

function App(props) {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();
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
      <h1>{`${size.width}x${size.height}`}</h1>
    </div>
  )
}

export default App;
