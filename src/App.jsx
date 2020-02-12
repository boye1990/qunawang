import React, { Component, memo } from 'react';
const Foo = memo(function Foo(props) {
  console.log('Foo执行render函数')
  return null
})
class App extends Component {
  state = {
    conts : 0
  }
  render() {
    return (
      <div>
        <button type='button' onClick={ ()=> this.setState({conts: this.state.conts+1}) }>Add</button>
        <Foo name='Mike'/>
        <h1>{this.state.conts}</h1>
      </div>
    )
  }
}

export default App;
