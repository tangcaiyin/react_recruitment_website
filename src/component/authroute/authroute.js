// 处理登录、注册、路由跳转信息
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

// AuthRoute 不是路由，不具有路由属性（this.props.history 等），
// 使用 @withRouter 实现路由转换，使得具有路由属性，
@withRouter
@connect(
	null,
	{loadData}
)
// AuthRoute 组件位于路由组件内，用于页面跳转，
class AuthRoute extends React.Component{
	render(){
		// 没有任何返回内容
		return null
	}
	componentDidMount(){
		const publicList = ['./login', 'register'];
		// 获取当前 URL 地址
		const pathname = this.props.location.pathname;
		if(publicList.indexOf(pathname) > -1){
			return null
		}
		// 获取用户信息，实现相应路由跳转
		axios.get('user/info').then(res=>{
			if(res.status === 200){
				if(res.data.code === 0){
					// 有登录信息
					// 调用 action，触发 reducer，实现实时保存账号信息到 user.redux
					// 没有该步骤，则无法在 redux 里监听到登录账号信息
					this.props.loadData(res.data.data)
				} else {
					// 无登录信息，跳转到登录页
					this.props.history.push('./login')
				}
			}
		})

	// 是否登录
	// 当前URL地址，login不需要跳转，register需要跳转
	// 用户type：boss、牛人
	// 用户是否完善信息，头像、个人简介
	}
}

export default AuthRoute