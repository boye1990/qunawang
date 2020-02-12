import React, { useState, useMemo } from 'react';

function Last(props) {
  return (
    <h1>click: {props.click} double: {props.double}</h1>
  )
}
function App(props) {
  const [count, setCount] = useState(0);
  const double = useMemo(() => {
    return count * 2
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count===3])
  return (
    <div>
      <button type='button' onClick= { () => setCount(count+1)}>
        Add
      </button>
      <Last click={count} double={double}/>
    </div>
  )
}

export default App;
