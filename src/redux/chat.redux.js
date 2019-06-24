import axios from 'axios'
import io from 'socket.io-client'
// 处理跨域，传入后端端口
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 已读
const MSG_READ = 'MSG_READ';

const initState = {
	chatmsg:[],
	users:{},
	// 未读信息数量
	unread:0
}

// reducer
export function chat(state=initState,action){
	switch(action.type){
		case MSG_LIST:
			// 信息接收人是当前登陆账号时，获取 read 字段为 false 的信息的条数，即为未读信息条数
			console.log('获取聊天记录列表')
			return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read && v.to===action.payload.userid).length};
		case MSG_RECV:
			// 仅当信息接收人是当前登陆账号时，设置未读信息加一，否则加零，
			const n = action.payload.to===action.userid ? 1 : 0;
			console.log(action.payload)
			return {...state,chatmsg:[...state.chatmsg,action.payload.msgs],unread:state.unread+n}
			// return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
		case MSG_READ:
			const {from,num} = action.payload;
			// 仅对当前信息 from 为当前用户的信息进行未读消息条数处理，
			return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from===v.from ? true:v.read})),unread:state.unread-num}
		default:
			return state;
	}
}

// action
function msgList(msgs,users,userid){
	return {type:'MSG_LIST',payload:{msgs,users,userid}}
}

function msgRecv(msgs,userid){
	return {type:'MSG_RECV',payload:{msgs,userid}}
}

// num 表示已读消息条数
function msgRead({from,userid,num}){
	return {type:'MSG_READ',payload:{from,userid,num}}
}

// 发送按钮调用该事件，
export function sendMsg({from,to,msg}){
	// 异步执行，需要手动 return dispatch 来控制 dispatch 的时机，
	// 需要返回函数
	return dispatch=>{
		// socket 发射事件 sendmsg 到后端 server，
		socket.emit("sendmsg",{from,to,msg})
	}
}

export function readMsg(from){
	return (dispatch,getState)=>{
		// from 参数为当前用户 userid，
		axios.post('/user/readmsg',{from}).then(res=>{
			// const userid = getState().user._id;
			const userid = localStorage.getItem('userid');
			if(res.status===200 && res.data.code===0){
				dispatch(msgRead({userid,from,num:res.data.num}))
			}
		})
	}
}

// 进入页面，接受信息
export function recvMsg(){
	return (dispatch,getState)=>{
		// 监听后端 server 里 io.emit 发射的 recvmsg 事件，接收数据，
		socket.on('recvmsg',function(data){
			console.log('接受信息')
			// const userid = getState().user._id;
			const userid = localStorage.getItem('userid');
			dispatch(msgRecv(data,userid));
			console.log(data,userid)
		})
	}
}

export function getMsgList(){
	// getState 获取 redux 内所有数据，
	return (dispatch,getState)=>{
		axios.get('/user/getmsglist').then(res=>{
			if(res.status===200 && res.data.code===0){
				// const userid = getState().user._id;
				const userid = localStorage.getItem('userid');
				dispatch(msgList(res.data.msgs,res.data.users,userid))
			}
		})
	}
}