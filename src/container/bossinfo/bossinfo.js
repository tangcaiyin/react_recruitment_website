import React from 'react'
import { NavBar, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{update}
)

class BossInfo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			title:'',
			desc:'',
			company:'',
			money:''
		}
		this.onChange = this.onChange.bind(this)
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}

	/*
	父组件传递函数给子组件，
	<AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
	<AvatarSelector selectAvatar={(imgname)=>{this.setState({avatar:imgname})}}></AvatarSelector>
	子组件调用传入的函数
	onClick={(ele)=>this.props.selectAvatar(ele.text)}
	*/
	render(){
		// bossinfo 页跳转到 boss 页，
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{ redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect>:null}
			    <NavBar mode="dark" >完善信息</NavBar>
			    <AvatarSelector selectAvatar={(imgname)=>{this.setState({avatar:imgname})}}></AvatarSelector>
			    <InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
			    <InputItem onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
			    <InputItem onChange={(v)=>this.onChange('money',v)}>职位薪资</InputItem>
			    <TextareaItem title="职位简介" autoHeight onChange={(v)=>this.onChange('desc',v)}/>
				<WhiteSpace></WhiteSpace>
				<Button type='primary' onClick={()=>{this.props.update(this.state)}}>保存</Button>
			</div>
		)
	}
}

export default BossInfo