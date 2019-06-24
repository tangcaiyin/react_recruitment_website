import React from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
	// 类型验证，
	// selectAvatar 为函数，且不可缺少，
	// static 
	static propTypes = {
		selectAvatar:PropTypes.func.isRequired
	}
	constructor(props){
		super(props)
		this.state = {

		}
	}
	render(){
		// 遍历头像名称数组，获取其文件路径及名称，传入 Grid 组件，
		const avatarList = 'man,woman,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
			.split(',')
			.map(v=>({
				icon:require(`../img/${v}.png`),
				text:v
			}));
		const gridHeader = this.state.icon
			?
			(<div>
				<span>已选择头像</span>
				<img style={{width:20}} src={this.state.icon} alt=""/>
			</div>)
			:
			<div>请选择头像</div>
		/* elm 表示当前选中的头像，为一 json 对象，{icon:'',text:''}， */
		return (
			<div>
				{/*{gridHeader}*/}
				<List renderHeader={()=>gridHeader}>
					{/* onClick 方法调用父组件传入的函数*/}
					<Grid data={avatarList} columnNum={5} onClick={ele=>{
						this.setState(ele);
						this.props.selectAvatar(ele.text)
					}}/>
				</List>
			</div>
		)
	}
}

export default AvatarSelector