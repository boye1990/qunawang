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
