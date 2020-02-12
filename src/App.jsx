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

  useEffect(()=>{
    document.title = conts
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
      <h1>{ `width:${size.width} height: ${size.height}`}</h1>
    </div>
  )
}

export default App;
