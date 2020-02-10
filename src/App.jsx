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
