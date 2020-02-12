import React, { useState, useEffect } from 'react';
function App(props) {
  const [conts, setConts] = useState(0);
  const [size, setSize] = useState({width: document.documentElement.clientWidth, height: document.documentElement.clientHeight});
  
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  const click = () => {
    console.log(`conts:${conts}`)
  }
  useEffect(()=>{
    document.title = conts
  })
  useEffect(() => {
    document.querySelector('#size').addEventListener('click', click, false)
    return () => {
      document.querySelector('#size').removeEventListener('click', click, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    }
  })
  return (
    <div>
      <button
       type='button'
       onClick = {() => {setConts(conts+1)}}
      >
        Add
      </button>
      {
        conts%2
        ? <h1 id='size'>{ `width:${size.width} height: ${size.height}`}</h1>
        : <span id='size'>{ `width:${size.width} height: ${size.height}`}</span>
      }
    </div>
  )
}

export default App;
