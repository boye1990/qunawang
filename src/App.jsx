import React, { Component, lazy, Suspense } from 'react';

/**
 * 通过lazy函数和import动态引入About组件，那么这个组件就是一个懒加载的组件，实行了代码拆分。
 * webpackChunkName: 'about' 这段注释是为拆分的代码另外命名，方便调试。命名之后在浏览器中名字为about.chunk.js
 */
const About = lazy(() => import(/*webpackChunkName: 'about'*/'./About.jsx'));

class App extends Component {
  state = {
    hasError: false 
  }
  // componentDidCatch() {
  //   this.setState({
  //     hasError: true
  //   })
  // }
  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }
  render() {
    if (this.state.hasError) {
      return (<div>Error</div>)
    }
    return (
      <div>
        {/* 使用Suspense包裹动态引入的组件 */}
        <Suspense fallback={<div>loading</div>}>
          <About></About>
        </Suspense>
      </div>
    )
  }
}

export default App;
