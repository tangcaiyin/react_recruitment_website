import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
	state => state.user,
	{logoutSubmit}
)
class User extends React.Component{
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this);
	}
	logout(){
		const alert = Modal.alert;
		alert('注销', '确认退出登录吗？', [
		    { text: '取消', onPress: () => console.log('cancel'),},
		    { text: '确认', onPress: () => {
				// 退出时，清除cookie，
				browserCookie.erase('userid');
				// 调用 redux 传入的方法，清除redux数据
				this.props.logoutSubmit();
				//刷新地址
				// window.location.href = window.location.href;
		    }},
		]);
	}
	render(){
		const props = this.props;
		const Item = List.Item;
		const Brief = Item.Brief;
		console.log(props)
		return props.user ? (
			<div>
				<Result
					img={<img src={require(`../img/${props.avatar}.png`)} alt="" style={{width:50}} />} 
					title={props.user}
					message={props.type==="boss" ? props.company : null}
					>
				</Result>
				<List renderHeader={()=>'简介'}>
					<Item multipleLine>
						{props.title}
						{props.desc.split('\n').map(v=><Brief key={v}>要求：{v}</Brief>)}
						{props.money ? <Brief>薪资：{props.money}</Brief> : null}
					</Item>					
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.logout}>退出</Item>
				</List>
			</div>
		) : <Redirect to={props.redirectTo}></Redirect>
	}
}

export default User