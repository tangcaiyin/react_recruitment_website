import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'

@connect(
	// 将 redux/chatuser.redux 里导出的数据、方法导入 Boss 组件
	state=>state.chatuser,
	{getUserList}
)
class Boss extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data:[]
		}
	}
	componentDidMount(){
		// 从通过 redux 进行管理的数据中获取传入该子组件的 props
		this.props.getUserList('genius')
		// axios.get('/user/list?type=genius').then(res=>{
		// 	if(res.data.code == 0){
		// 		this.setState({data:res.data.data})
		// 	}
		// })
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
					(<Card key={v._id}>
						<Header title={v.user} thumb={require(`../img/${v.avatar}.png`)} extra={<span>{v.title}</span>}></Header>
						<Body>
							{v.desc.split('\n').map(v=>(
								<div key={v}>{v}</div>
							))}
						</Body>
					</Card>) : null
				))}
			</WingBlank>
		)
	}
}

export default Boss