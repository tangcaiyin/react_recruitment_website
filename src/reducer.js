// 合并所有 reducer
import {combineReducers} from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'

export default combineReducers({user,chatuser })

