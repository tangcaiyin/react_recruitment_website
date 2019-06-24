import React from 'react'

// 高阶组件，为初始组件添加 handleChange() 方法，传入 state，得到 WrapperComp 高阶组件，
export default function imoocForm(Comp){
	return class WrapperComp extends React.Component{
		constructor(props){
			super(props);
			this.state = {}
			this.handleChange = this.handleChange.bind(this)
		}
		handleChange(key,val){
			this.setState({
				// 变量 key 外需要中括号，避免保存 key 字符串，
				[key]:val
			})
		}
		render(){
			// 属性穿透
			return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
		}
	}

}