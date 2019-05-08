import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'

@connect(
	state => state.user,
	{register}
)

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'genius'
		}
		this.login = this.login.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}
	login(){
		console.log(this.props)
		this.props.history.push('/login')
	}
	handleChange(key,val){
		this.setState({
			// 变量 key 外需要中括号，避免保存 key 字符串，
			[key]:val
		})
	}
	handleRegister(){
		// 把 this.state 保存的输入框内容传给 user.redux 的 register 方法，进行数据验证
		this.props.register(this.state)
		console.log(this.state)
	}
	render(){
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{/* this.props 数据来自 user-redux */}
				{/* 根据是否存在 redirectTo 属性值，决定跳转到哪个页面  */}
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{/* 根据是否存在错误信息，显示相应错误提示*/}
						{this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
						{/* v 表示输入值*/}
						<InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
						<InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
						<InputItem type='password' onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
						<RadioItem checked={this.state.type==='genius'} onChange={()=>this.handleChange('type','genius')}>应聘者</RadioItem>
						<RadioItem checked={this.state.type==='boss'}  onChange={()=>this.handleChange('type','boss')}>Boss</RadioItem>
					</List>
					<WhiteSpace></WhiteSpace>
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
					<WhiteSpace></WhiteSpace>
					<Button onClick={this.login}>登陆</Button>
				</WingBlank>
			</div>
		)
	}
}
export default Register