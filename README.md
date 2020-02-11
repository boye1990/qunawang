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

### Suspense

### memo
