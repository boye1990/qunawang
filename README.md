## 项目初始化

```javascript
// 全局安装react-app脚手架
npm install -g create-react-app
// 使用脚手架创建项目
create-react-app my-project
// 进入自己项目文件夹
cd my-project
// 启动项目
npm start

/**
 * 如果你的 npm 5.2.0+ 可以使用npx命令：,这样你就可以不需要全局安装脚手架
 * 因为npx命令在执行之后回删除它。
*/
// 

// 创建项目
npx create-react-app my-app
// 进入项目文件夹
cd my-app
// 启动项目
npm start
```
## React 新特性

### Context
>  定义： 简单解释一下，context就相当于一个全局变量一样的，在一个组件树中，根组件传递值或者方法给子孙后代组件，需要一层一层的传，相当麻烦。
而这个context，定义了组件树的共享上下文，使得传递值，不需要经过中间组件，也有人戏称为react中的虫洞。不要滥用Context，会影响组件的独立性。
>  结构： 生产者< Provider > 消费者：< Consumer >
>  API:  1.createContext(param) 创建context，传入的参数可作为默认值。
         2.useContext(contextName) 传入context名字来消费context。它却带了老的contextType语法。
##### 单个context列子
```jsx
// 引入context函数
import React, { createContext, useState } from 'react';

// 通过createContext函数创建context，该函数可以传入一个context的默认值
const BatteryContext = createContext();

// 创建一个消费context的组件
function Leaf() {
  return (
    // 创建context的消费这
    <BatteryContext.Consumer>
      {/* 使用context */}
      {
        battery => <h1>Battery: {battery}</h1>
      }
    </BatteryContext.Consumer>
  );
}

// 创建一个中间组件
function Middle() {
  return (
    <Leaf/>
  );
}

function App() {
  const [battery, setBattery] = useState(60);
  return (
    // 创建Context的Provider生产者
    <BatteryContext.Provider value={ battery }>
      <button
        type='button'
        onClick={() => setBattery(battery-1)}
      >
        Press
      </button>
      <Middle/>
    </BatteryContext.Provider>
  );
}

export default App;

```
##### 多个context例子
```jsx
// 引入context函数
import React, { createContext, useState } from 'react';

// 通过createContext函数创建context，该函数可以传入一个context的默认值
const BatteryContext = createContext();

// 创建多个context
const OnlineContext = createContext();

// 创建一个消费context的组件
function Leaf() {
  return (
    // 创建context的消费这
    <BatteryContext.Consumer>
      {/* 使用context */}
      {
        battery => (
          <OnlineContext.Consumer>
            {
              online => <h1>Battery: { battery } Online: { String(online) }</h1>
            }
          </OnlineContext.Consumer>
        )
      }
    </BatteryContext.Consumer>
  );
}

// 创建一个中间组件
function Middle() {
  return (
    <Leaf/>
  );
}

function App() {
  const [battery, setBattery] = useState(60);
  const [online, setOnline] = useState(false);
  return (
    // 创建Context的Provider生产者
    <BatteryContext.Provider value = { battery }>
      <OnlineContext.Provider value = { online }>
        <button
          type='button'
          onClick={() => setBattery(battery-1)}
        >
          Press
        </button>
        <button
          type='button'
          onClick={() => setOnline(!online)}
        >
          Switch
        </button>
        <Middle/>
      </OnlineContext.Provider>
    </BatteryContext.Provider>
  );
}

export default App;

```
##### useContext的用法（ContextType）
```jsx
    // 引入context函数
import React, { createContext, useState, useContext } from 'react';

// 通过createContext函数创建context，该函数可以传入一个context的默认值
const BatteryContext = createContext();

// 使用useContext来消费Context，就不需要写丑陋的Consumer标签了
function Leaf() {
  // 老式写法static contextType =  BatteryContext;
  const battery = useContext(BatteryContext); //由于没有了this,所以我们需要用这个api来获取context,然后使用.其他的用法一样
  return (
     <h1>Battery: { battery }</h1>
  );
}

// 创建一个中间组件
function Middle() {
  return (
    <Leaf/>
  );
}

function App() {
  const [battery, setBattery] = useState(60);
  return (
    // 创建Context的Provider生产者
    <BatteryContext.Provider value = { battery }>
        <button
          type='button'
          onClick={() => setBattery(battery-1)}
        >
          Press
        </button>
        <Middle/>
    </BatteryContext.Provider>
  );
}

export default App;

```
### 代码拆分，页面懒加载
> 暂时没有使用的资源，延迟加载。比如图片懒加载。js代码也一样，如果没有执行的代码也是不需要先下载的。
> Webpack - Code Splitting。代码拆分，也就是将一个页面的js代码人为拆分为多个。
> import: 我们都知道可以用来引入静态模块。它同样可以用来引入动态模块。
> 如果你在项目中使用import动态引入一个js模块，webpack就会使用CodeSplitting进行一次代码拆分，将这个动态引入的js文件及其依赖，打包成一个独立的js文件。与当前页面的js拆分开来。只有在使用到的时候才会去加载这个独立的js文件 
```javascript
// 引入动态模块
import('./detail.js').then(...)
```

### lazy 和 Suspense
> 前言： 我们通过 webpack 或是 rollup 这样工具可以将项目多个 JavaScript 文件最终打包成为一个 bundle 文件。加载一个 js 文件速度要快于加载多个 JavaScript 文件。不过随着 bundle 的体积不断增大，最终造成首次加载时间过长，还有就是加载一些不必要的 javascript 文件。
所以我们想是否可以对 bundle 文件进行拆分来进行按需加载，就此需求 webpack 和 rollup 都给出自己解决方案，支持代码拆分，也就是 code splitting。在 react 我们可以用 import('./Foo.js').then() 方式进行 code 的懒加载。同时需要配合react中lazy和Suspense。

> 需要注意的是Suspense必须有一个fallback属性，这个属性值必须是一个jsx代码。
  这个传入的jsx就是在被包裹的需要异步懒加载的组件，没有被渲染之前展示的。具体用法如下。
```jsx
// 声明一个About独立组件
import React from 'react';

function About() {
    return (
        <div>About</div>
    )
}

export default About;

// ======================分割线=========================

import React, { lazy, Suspense } from 'react';

/**
 * 通过lazy函数和import动态引入About组件，那么这个组件就是一个懒加载的组件，实行了代码拆分。
 * webpackChunkName: 'about' 这段注释是为拆分的代码另外命名，方便调试。命名之后在浏览器中名字为about.chunk.js
 */
const About = lazy(() => import(/*webpackChunkName: 'about'*/'./About.jsx'));

function App() {
  return (
    <div>
      {/* 使用Suspense包裹动态引入的组件 */}
      <Suspense fallback={<div>loading</div>}>
        <About></About>
      </Suspense>
    </div>
  )
}

export default App;

```

### memo
> React v16.6.0出了一些新的包装函数(wrapped functions)，一种用于函数组件PureComponent / shouldComponentUpdate形式的React.memo()
> React.memo()是一个高阶函数，它与 React.PureComponent类似，但是一个函数组件而非一个类
> 用途：使用在无状态函数组件上，代替 pureComponent 和 shouldComponentUpdate。减少不必要组件重复渲染

##### 先看一下代码，未优化之前
```jsx
/**
 * 这段代码2个组件，父组件App中每次点击Add按钮，就会修改state中conts的值。
 * state的改变 => 组件重新渲染，同时也导致了子组件Foo的重新渲染。
 * 但是Foo组件对state中的值无依赖，造成了不必要的渲染。这就是一个可以优化的点
*/
import React, { Component } from 'react';
class Foo extends Component {
  render() {
    console.log('Foo执行render函数')
    return null
  }
}
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

```
##### 使用生命周期函数 shouldComponentUpdate 对以上代码进行优化
```jsx
/**
 * 在Foo组件中只有一个props那就是name属性，只要这个属性不变，Foo就可以不必重新渲染。
 * 在Foo的生命周期函数shouldComponentUpdate添加一个判断条件，当条件真，返回false。不再执行render函数。
*/
import React, { Component } from 'react';
class Foo extends Component {
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.name === this.props.name) {
      return false
    }
  }
  render() {
    console.log('Foo执行render函数')
    return null
  }
}
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

```

##### 使用 PureComponent 防止多余渲染
```jsx
/**
 * react 提供了一个 PureComponent 来防止组件进行多余渲染。
 * 但是PureComponent无法监测对象的属性的变化。所以假设当前组件对一个对象中的属性有依赖，这个属性变化了。
 * PureComponent也无法监测。不会重新执行runder函数。
*/
import React, { Component, PureComponent } from 'react';
class Foo extends PureComponent {
  render() {
    console.log('Foo执行render函数')
    return null
  }
}
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

```
##### 使用memo优化代码
```jsx
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
```
## React Hooks
### Hooks的优势
##### 优化类组件三大问题
1. 函数组件无this问题
2. 自定义Hook方便复用状态逻辑
3. 副作用的关注点分离
##### 添加eslint react-hooks 插件
> npm i eslint-plugin-react-hooks -D

> 并修改package.json文件

```json
  "eslintConfig": {
    "extends": "react-app",
    "plugins": [
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error"
    }
  },
```
##### use state
> 在函数组件中如何使用state，使用useState可以在函数组件中使用state。从此函数组件并不一定是无状态组件。
```jsx
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

```
##### Effect Hooks
1. 首先了解一下什么react的副作用1.绑定时间，2.网络请求，访问DOM
2. 使用副作用的时机：Mount之后，Update之后，Unmount之前
3. 对应的生命周期函数是：componentDidMount，componentDidUpdate， componentWillUnmount
4. 现在我们可以使用useEffect函数来覆盖以上所有情况，一般情况useEffect函数是在render之后调用。也可以根据自定义状态来决定调用还是不调用。
5. useEffect还有一个回调函数 Clean Callback，它是清除上一次副作用遗留下的状态。
6. useEffect的回调函数第二个参数可以传入一个数组，当这个数组为空时，回调只执行一次。如果不传，则每次都会执行。如果传入非空数组，当数组元素变化时执行一次。
```jsx
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

```
