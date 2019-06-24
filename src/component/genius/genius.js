import React from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard' 

@connect(
	// 将 redux/chatuser.redux 里导出的数据、方法导入 Boss 组件
	state=>state.chatuser,
	{getUserList}
)
class Genius extends React.Component{
	componentDidMount(){
		// 调用传入该组件的 getUserList 方法，
		// 从通过 redux 进行管理的数据中获取 boss 列表，
		this.props.getUserList('boss')
		// axios.get('/user/list?type=genius').then(res=>{
		// 	if(res.data.code == 0){
		// 		this.setState({data:res.data.data})
		// 	}
		// })
	}
	render(){
		console.log(this.props.userlist)
		return <UserCard userlist={this.props.userlist}></UserCard>
	}
}

export default Genius