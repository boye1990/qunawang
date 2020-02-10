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
而这个context，定义了组件树的共享上下文，使得传递值，不需要经过中间组件，也有人戏称为react中的虫洞。不要滥用Context，回影响组件的独立性。
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
##### useContext的用法
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
### ContextType

### lazy

### Suspense

### memo
