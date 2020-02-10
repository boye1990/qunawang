### 项目初始化

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
### React 新特性

#### Context
>  定义： 简单解释一下，context就相当于一个全局变量一样的，在一个组件树中，根组件传递值或者方法给子孙后代组件，需要一层一层的传，相当麻烦。
而这个context，定义了组件树的共享上下文，使得传递值，不需要经过中间组件，也有人戏称为react中的虫洞。不要滥用Context，回影响组件的独立性。
>  结构： 提供者：< Provider > 消费者：< Consumer >
>  API:

#### ContextType

#### lazy

#### Suspense

#### memo
