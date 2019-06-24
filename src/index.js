// 引用库
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// 从自定义文件引用内容
import AuthRoute from './component/authroute/authroute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import reducers from './reducer'
import './config'
import './index.css'

// redux-devtools 扩展
const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

// 创建 store 并作为参数传入组件

// react 默认的同步处理任务
// const store = createStore(counter);

// 安装 redux-thunk，使用 applyMiddleware、thunk 处理异步任务
// const store = createStore(counter, applyMiddleware(thunk));

// 使用 redux-devtools 扩展调试 redux，
const store = createStore(reducers, compose(applyMiddleware(thunk), reduxDevtools));

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					{/*
					 Route 外嵌套 Switch时，路由只要匹配上就就近渲染，后面匹配的会忽略，
					 当定义 path 的路由都未匹配，则跳转到未定义具体 path 属性的路由，可以用于设置 404 页面，
					 Route 外未嵌套 Switch 时，匹配 path 的路由会被渲染，未定义 path 的路由则会被所有路由渲染，
					  */}
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/chat/:user' component={Chat}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
