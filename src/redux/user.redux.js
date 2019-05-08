import axios from 'axios'
import {getRedirectPath} from '../util'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
	// 注册登陆成功后跳转到某个页面
	redirectTo:'',
	// isAuth:'',
	msg:'',
	user:'',
	type:''
	// pwd:'',
}

// reducer
// getRedirectPath 是个纯函数，该 user - reducer 依然是纯函数
export function user(state=initState,action){
	switch(action.type){
		// case REGISTER_SUCCESS:
		// 	return {...state, msg:'',redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}
		// case LOGIN_SUCCESS:
		// 	return {...state, msg:'',redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}

		// 注册、登陆成功，返回更新后的 state、跳转的页面路径等参数
		case AUTH_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload), ...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			// 失败，返回错误信息，
			return {...state, msg:action.msg, isAuth:false}
		default:
			return state
	}
}


// action
// 返回相应 action 执行类型及初始 state，(触发 reducer，返回更新后的 redux)
// function registerSuccess(data){
// 	return {type:REGISTER_SUCCESS,payload:data}
// }

// function loginSuccess(data){
// 	return {type:LOGIN_SUCCESS,payload:data}
// }


// registerSuccess、loginSuccess 统一为 authSuccess
function authSuccess(obj){
	// 将 obj 中去除 pwd 的后数据作为 data，
	const {pwd,...data} = obj
	return {type:AUTH_SUCCESS,payload:data}
}

function errorMSG(msg){
	// msg:msg 若ES6简写为 msg，需放在最前面，
	return {msg, type:ERROR_MSG}
}

// payload 是传入该 action 的初始 state
export function loadData(userinfo){
	return {type:LOAD_DATA, payload:userinfo}
}

export function update(data){
	return dispatch=>{
		axios.post('/user/update',data).then(res=>{
			if(res.status===200 && res.data.code===0){
				// 派发携带初始 state 的 action 到 reducer，
				dispatch(authSuccess(res.data.data))
			} else {
				dispatch(errorMSG(res.data.msg))
			}
		})
	}
}

export function login({user,pwd}){
	if(!user || !pwd){
		return errorMSG('用户名密码不可缺少')
	}
	// 实现同步提交
	return dispatch=>{
		axios.post('/user/login',{user,pwd}).then(res=>{
			if(res.status===200 && res.data.code===0){
				// 派发携带初始 state 的 action 到 reducer，
				dispatch(authSuccess(res.data.data))
				// dispatch(loginSuccess(res.data.data))
			} else {
				dispatch(errorMSG(res.data.msg))
			}
		})
	}
}

export function register({user,pwd,repeatpwd,type}){
	if(!user || !pwd){
		return errorMSG('用户名密码不可缺少')
	}
	if(pwd !== repeatpwd){
		return errorMSG('密码和确认密码不一致')
	}
	// 实现同步提交
	return dispatch=>{
		axios.post('/user/register', {user,pwd,type}).then(res=>{
			if(res.status===200 && res.data.code===0){
				dispatch(authSuccess({user,pwd,type}))
				// dispatch(registerSuccess({user,pwd,type}))
			} else {
				dispatch(errorMSG(res.data.msg))
			}
		})
	}
}