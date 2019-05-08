const express = require('express');
// md5 密码加密工具，对注册的密码进行加密
const utils = require('utility');

const Router = express.Router()

const model = require('./model')
const User = model.getModel('user')

// 定义过滤条件，过滤以下属性，接口响应里将不返回属性值设为 0 的属性，
// 该过滤条件作为参数传入接口的 find() 方法里，
const _filter = {'pwd':0, '__v':0}


// find、findByIdAndUpdate、findOne 为 mongodb api，


// 以下接口属于 /user 路由下的子路由，/user/list，

Router.get('/list', function(req,res){
	// 清除所有数据
	// User.remove({},function(err,doc){})
	const {type} = req.query;
	// 根据第一个参数所表示的条件查找数据
	User.find({type}, function(err,doc){
		return res.json({code:0,data:doc})
	})
	// http://localhost:9093/user/list?type=boss
})

// 完善信息更新数据
Router.post('/update',function(req,res){
	const userid = req.cookies.userid;
	if(!userid){
		return json.dumps({code:1})
	}
	const body = req.body;
	// 根据 id 更新数据
	User.findByIdAndUpdate(userid,body,function(err,doc){
		// 将最新数据 body 合并到原始数据里
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})

})

// 后端处理 login 地址的请求
Router.post('/login',function(req,res){
	// 从请求体内获取前端提交的数据
	const {user,pwd} = req.body;
	// 查询用户名和加密后的密码
	/*
	doc 是后端接口 login、register 返回的 json 格式响应结果:
	{
		_id: "5cbdd40e74749b6511655eb4",
		user: "imooc",
		type: "boss",
		pwd: "50d116635833a0c2259a0aa79c587834",
		__v: 0
	}
	*/
	User.findOne({user,pwd:md5Pwd(pwd)}, _filter, function(err,doc){
		if(!doc){
			return res.json({code:1, msg:'用户名或密码错误'})
		}
		// cookie-parser 的 cookie API 设置 cookie，以 _id 作为 cookie 值，
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})

// 注册，post 提交数据到后端，
Router.post('/register', function(req,res){
	// req.body 为传递到后端的值
	console.log(req.body)
	// 从请求体内获取前端提交的数据
	const {user, pwd, type} = req.body;
	// 检查唯一性
	User.findOne({user:user}, function(err,doc){
		if(doc){
			// 查询到请求体，则说明数据重复
			return res.json({code:1,msg:'用户名重复'})
		}

		// 为获取后端 register 接口生成的数据对象里的随机 id，不使用 create 方法，使用 save 方法，
		const userModel = new User({user, type, pwd:md5Pwd(pwd)})
		userModel.save(function(err, doc){
			if(err){
				return res.json({code:1, msg:'后端出错了'})
			}
			const {user, type, _id} = doc;
			// 注册成功后，同时转为登录状态，记录当前账号信息，
			res.cookie('userid', _id);
			return res.json({code:0, data:{user, type, _id}})
		})

		// 创建该 json 对象数据，
		// create 生成数据对象之后才能产生随机 id，因此无法使用 create 返回随机 id
		// User.create({user, type, pwd:md5Pwd(pwd)}, function(e, d){
		// 	if(e){
		// 		return res.json({code:1, msg:'后端出错了'})
		// 	}
		// 	return res.json({code:0})
		// })
	})
})

// 用户cookie判断
Router.get('/info', function(req,res){
	// 请求体里读取 cookies，
	const {userid} = req.cookies;
	if(!userid){
		// 登陆信息：1 表示无，0表示有，
		// 该请求地址返回 json 数据
		return res.json({code:1})
	} 
	// User.findById(userid)
	User.findOne({_id:userid},_filter,function(err,doc){
		if(err){
			return res.json({code:1,msg:"后端出错了"})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
})

// md5+salt，加盐，提高加密复杂度，
function md5Pwd(pwd){
	const salt = 'dbvdgvb3546hvjgcr46b5gv7=-=%#@#^&*&*';
	return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
