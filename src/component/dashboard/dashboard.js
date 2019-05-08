import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'

function Genius(){
	return <h2>Genius</h2>
}
function Msg(){
	return <h2>消息列表页面</h2>
}
function User(){
	return <h2>个人中心页面</h2>
}

@connect(
	state => state
)

class Dashboard extends React.Component{
	render(){
		console.log(this.props.location)
		const {pathname} = this.props.location;
		const user = this.props.user;
		const navList = [
			{
				path:'/boss',
				text:'企业',
				icon:'boss',
				// 企业账户，查看的是应聘者列表
				title:'应聘者列表',
				component:Boss,
				// 身份是 genius 时，隐藏 Boss 页面
				hide:user.type==='genius'
			},
			{
				path:'/genius',
				text:'应聘者',
				icon:'job',
				title:'企业列表',
				component:Genius,
				// 身份是 boss 时，隐藏 genius 页面
				hide:user.type==='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
		 // find 方法里 this.props.location 匹配哪个 nav 则显示对应 nav, 
		return(
			<div>
				<NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
				<div style={{marginTop:45}}>
			{/*根据列表渲染四个路由组件，遍历时必须要有 key 属性*/}
					<Switch>
						{navList.map(v=>(
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
					</Switch>
					
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default Dashboard