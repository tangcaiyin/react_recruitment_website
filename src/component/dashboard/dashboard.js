import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
// 企业组件
import Boss from '../../component/boss/boss'
// 应聘者组件
import Genius from '../../component/genius/genius'
// 个人中心组件
import User from '../../component/user/user'
import Msg  from '../../component/msg/msg'
import {getMsgList, recvMsg} from '../../redux/chat.redux'

@connect(
	state => state,
	{getMsgList, recvMsg}
)

class Dashboard extends React.Component{
	componentDidMount(){
		// 调用 redux 里的方法获取聊天历史数据、获取当前聊天数据
		// 有时页面切换会调用 recvMsg() 方法多次，造成同一条信息在聊天窗口里重复显示多条，需要对聊天记录做条数判断
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}
	render(){
		console.log(this.props.location)
		const {pathname} = this.props.location;
		const user = this.props.user;
		const navList = [
			{
				path:'/boss',
				text:'应聘者',
				icon:'boss',
				// 企业账户，查看的是应聘者列表
				title:'应聘者列表',
				component:Boss,
				// 身份是 genius 时，隐藏 Boss 页面
				hide:user.type==='genius'
			},
			{
				path:'/genius',
				text:'企业',
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