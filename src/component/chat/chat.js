import React from 'react'
import {connect} from 'react-redux'
import {NavBar,List,InputItem,Icon,Grid} from 'antd-mobile'
import {getMsgList, recvMsg, sendMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

import io from 'socket.io-client'
// 处理跨域，传入后端端口
const socket = io('ws://localhost:9093')

@connect(
	state=>state,
	{getMsgList, recvMsg, sendMsg, readMsg}
)
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text:'',
			msg:[],
			showEmoji:false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		console.log(this.props)
		// 开发环境下，刷新聊天页面，无法获取从 dashboard 页面传入的聊天记录数据，
		// 因此在没有聊天记录数组为空时，重新发送请求，
		if(!this.props.chat.chatmsg.length){
			console.log('重新请求数据')
			// 调用 redux 里的方法获取聊天历史数据、获取当前聊天数据
			this.props.getMsgList();
			this.props.recvMsg();
		}
		// 局部连接 socket 监听全局连接 io，获取信息
		// socket.on('recvmsg', (data)=>{
		// 	this.setState({
		// 		msg:[...this.state.msg, data.text]
		// 	})
		// })
	}
	componentWillUnmount(){
		// 退出当前路由，即离开聊天页面时，对未读消息条数进行处理
		// 实际运行效果反应略慢，退出聊天页面时，能够看到未读条数被清空
		const to = this.props.match.params.user;
		this.props.readMsg(to)
	}
	fixCarousel(){
		// 解决页面初始化及点击 emoji 按钮时 Grid 仅显示一行 emoji 的 bug,
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		// socket 直接发送信息到后端，
		// socket.emit('sendmsg',{text:this.state.text})

		// 从 this.props 里获取发送、接受对象
		// BUG:页面刷新后将无法获取 user._id，
		// 从上一页进入时，使用 localStorage 保存当前账号 id，
		// 用户账号两种身份，
		// 
		const from = localStorage.getItem('userid');
		// const from = this.props.user._id;
		// chat 页面地址参数里获取发送对象
		const to = this.props.match.params.user;
		const msg = this.state.text;
		console.log({from,to,msg})
		// 调用 chat.redux 里方法，发送信息到 redux，
		this.props.sendMsg({from,to,msg});
		// 信息发送后，清空 state，输入框获取该 state，因此同步清空
		this.setState({text:''})
	}
	render(){
		const emoji = '😂 😍 😊 🤔 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 😤 😡 😠 🤬 😈 👿 👋 🤚 🖐 ✋ 🖖 👌 ✌ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍'.split(' ').filter(v=>v).map(v=>({text:v}));
		// console.log(localStorage.getItem('userid'))
		// Chat 组件被 Route 包裹，this.props 将拥有 history、match 参数，
		console.log(this.props)
		const userid = this.props.match.params.user;
		const Item = List.Item;
		const users = this.props.chat.users;
		if(!users[userid]){
			return null
		}
		const from = localStorage.getItem('userid');
		const chatid = getChatId(userid,from);
		// console.log(chatid)		
		// const chatid = getChatId(userid,this.props.user._id);
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid);
		console.log(chatmsgs)
		// v.to!==userid，该信息不是发送给对方的，是自己收到的信息，显示在左侧，
		return (
			<div id="chat-page">
				<NavBar mode='dark' icon={<Icon type="left"/>} onLeftClick={()=>{this.props.history.goBack()}}>{users[userid].name}</NavBar>
				<div className="content-body">					
				{chatmsgs.map(v=>{
					const avatar = require(`../img/${users[v.from].avatar}.png`)
					return v.from===userid ?
					(
						<List key={v._id}>
							<Item thumb={avatar}>{v.content}</Item>
						</List>
					)
					: 
					(
						<List key={v._id}>
							<Item extra={<img src={avatar} alt=""/>} className="chat-me">{v.content}</Item>
						</List>
					)
				})}
				</div>
				<div className="stick-footer">
					<List>
						<InputItem 
							placeholder='请输入' 
							value={this.state.text} 
							onChange={(v)=>{this.setState({'text':v})}}
							extra={
								<div style={{height:30}}>										
									<span 
									    onClick={()=>{
									    	this.setState({
										    	showEmoji:!this.state.showEmoji
										    })
										    this.fixCarousel();
									    }} 
										style={{marginRight:15}}>🙂</span>
									<span onClick={()=>this.handleSubmit()}>发送</span>
								</div>
							}
						>						
						</InputItem>
					</List>
					{
						this.state.showEmoji
						? 
						<Grid 
							data={emoji} 
							columnNum={8} 
							carouselMaxRow={4} 
							isCarousel={true} 
							onClick={el=>{
								this.setState({
									text:this.state.text + el.text
								})
							}}
						></Grid>
						:
						null
					}
				</div>
			</div>
		)
	}
}

export default Chat