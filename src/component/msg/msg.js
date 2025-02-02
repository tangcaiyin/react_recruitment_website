import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
	state=>state
)
class Msg extends React.Component{
	getLast(arr){
		return arr[arr.length-1]
	}
	render(){
		if(!this.props.chat.chatmsg.length){
			return null
		}
		const Item = List.Item;
		const Brief = Item.Brief;
		const userid = this.props.user._id;
		const userinfo = this.props.chat.users;
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || [];
			msgGroup[v.chatid].push(v);
		}) 
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time;
			const b_last = this.getLast(b).create_time;
			return b_last - a_last
		})		
		console.log(msgGroup)
		console.log(chatList)
		return(
			<div>
				{chatList.map(v=>{
					const lastItem = this.getLast(v);
					const targetId = v[0].from===userid ? v[0].to : v[0].from;
					const unreadNum = v.filter(v=>!v.read && v.to===userid).length;
					return(
						<List key={lastItem._id}>
							<Item 
								extra={<Badge text={unreadNum}></Badge>} 
								thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
								arrow="horizontal"
								onClick={()=>{
									this.props.history.push(`/chat/${targetId}`)
								}}
							>
								{lastItem.content}
								<Brief>{userinfo[targetId].name}</Brief>
							</Item>
						</List>
					)
				})}
			</div>
		)
	}


}

export default Msg