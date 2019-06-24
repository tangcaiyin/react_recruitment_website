import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


@connect(
	state=>state.chat,
)
// 将 NavLinkBar 转化为 路由组件
@withRouter
class NavLinkBar extends React.Component{
	static propTypes = {
		// 限制传入该组件的 data 为数组且必需，
		data:PropTypes.array.isRequired
	}
	render(){
		console.log(this.props)
		// 接受父组件传入的保存在 this.props.data 的数据
		const navList = this.props.data.filter(v=>!(v.hide))
		// 根据当前页面地址，确定当前 tabbar 的 selected 状态，点击修改地址
		const {pathname} = this.props.location;
		// 仅对 path 为 /msg 的 tab 设置未读消息标记
		return (
			<TabBar>
				{navList.map(v=>(

					<TabBar.Item 
						badge={v.path=='/msg' ? this.props.unread : 0}
						key={v.path}
						title={v.text}
						icon={{uri:require(`./img/${v.icon}.png`)}}	
						selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}	
						selected={pathname===v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
						></TabBar.Item>
				))}
			</TabBar>
		)
	}
}

export default NavLinkBar