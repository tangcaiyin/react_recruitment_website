import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@connect(
	state=>state.user
)
@withRouter
// 将 UserCard 转为路由组件（用于获取 this.props 的 history 属性），该组件为 boss、genius 组件共用
class UserCard extends React.Component{
	static propTypes = {
		userlist:PropTypes.array.isRequired
	}
	handleClick(v){
		// 将当前卡片信息里的 _id 参数传入 history 里，用于跳转到 chat 页面时，获取当前 user，
		this.props.history.push(`/chat/${v._id}`)
		const userid = this.props._id;
		localStorage.setItem('userid',userid);
	}
	render(){		
		const Header = Card.Header
		const Body = Card.Body
		return (
			<WingBlank>
				<WhiteSpace></WhiteSpace>
				{this.props.userlist.map(v=>(
					// 判断是否有头像
					v.avatar?
					(<Card key={v._id} onClick={()=>this.handleClick(v)}>
						<Header 
							title={v.user} 
							thumb={require(`../img/${v.avatar}.png`)} 
							extra={<span>{v.title}</span>}
							>
						</Header>
						<Body>
							{v.type==='boss' ? <div>公司：{v.company}</div> : null}
							{
								v.type==='boss'
								? 
								<div>要求：{v.desc.split('\n').map(d=>(
										<span key={d}>{d}</span>
									))}
								</div>
								:
								<div>
									{v.desc.split('\n').map(d=>(
										<div key={d}>{d}</div>
									))}
								</div>
							}
							{v.type==='boss' ? <div>薪资：{v.money}</div> : null}
						</Body>
					</Card>) : null
				))}
			</WingBlank>
		)
	}
}

export default UserCard