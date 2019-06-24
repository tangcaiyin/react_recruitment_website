import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
	// 获取 state 下的 user 数据
	state=>state.user,
	{login}
)
@imoocForm
class Login extends React.Component{
	constructor(props){
		super(props)
		// this.state = {
		// 	user:'',
		// 	pwd:''
		// }
		this.register = this.register.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	// 跳转到注册页，
	register(){
		console.log(this.props)
		this.props.history.push('/register')
	}
	// handleChange(key,val){
	// 	this.setState({
	// 		// 变量 key 外需要中括号，避免保存 key 字符串，
	// 		[key]:val
	// 	})
	// }
	handleLogin(){
		// 把 this.state 保存的输入框内容传给 user.redux 的 login 方法，进行数据验证
		this.props.login(this.props.state)
	}

	// this.state、this.handleChange() 替换为来自 imoocForm 的 this.props.state、this.props.handleChange()，

	render(){
		return (
			<div>
				{/* this.props 数据来自 user-redux */}
				{/* 根据是否存在 redirectTo 属性值，决定跳转到哪个页面  */}
				{(this.props.redirectTo&&this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo}/> : null}
				<Logo></Logo>
				{/* WingBlank 内显示各类输入框， */}
				<WingBlank>
					<List>
						{this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
						<InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
						<InputItem onChange={v=>this.props.handleChange('pwd',v)} type='password'>密码</InputItem>
					</List>
					<WhiteSpace></WhiteSpace>
					<Button type="primary" onClick={this.handleLogin}>登陆</Button>
					<WhiteSpace></WhiteSpace>
					<Button onClick={this.register}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}
export default Login