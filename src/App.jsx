import React, { useState } from 'react';
function App(props) {
  const [conts, setConts] = useState(0);
  return (
    <div>
      <button
       type='button'
       onClick = {() => {setConts(conts+1)}}
      >
        Add
      </button>
      <h1>{conts}</h1>
    </div>
  )
}

export default App;
