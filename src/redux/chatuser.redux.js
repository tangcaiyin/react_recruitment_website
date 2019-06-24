import axios from 'axios'
const USER_LIST = 'USER_LIST'
const initState = {
	userlist:[]
}
// reducer
export function chatuser(state=initState,action){
	switch(action.type){
		case USER_LIST:
		// 把 action.payload 传入 userlist，获取更新后的数据
			return {...state, userlist:action.payload}
		default:
			return state
	}
}

function userList(data){
	return {type:USER_LIST,payload:data}
}

// 该方法传入子组件，用于子组件调用
export function getUserList(type){
	return dispatch=>{
		// 以下是对 component/boss/boss 组件内 componentDidMount 生命周期下的请求进行改写，
		axios.get('/user/list?type=' + type).then(res=>{
			if(res.data.code === 0){
				// this.setState({data:res.data.data})
				dispatch(userList(res.data.data))
			}
		})
	}
}

