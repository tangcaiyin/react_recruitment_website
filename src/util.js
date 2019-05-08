// 工具文件

// 用于获取跳转地址
// 根据用户信息，返回跳转页面地址
// user.type:boss、genius
// user.avatar:bossInfo、geniusInfo
export function getRedirectPath({type,avatar}){

	// 根据用户类型，赋值相应 url 地址，
	let url = (type==='boss') ? '/boss' : '/genius'
	// 根据是否有头像，跳转到完善信息页面，
	if(!avatar){
		url += 'info'
	}
	return url
}