// 该文件用于操作数据

const mongoose = require('mongoose');

// 命令窗口进入mongodb安装目录 .../bin下运行mongo.exe命令获取数据库地址，尾部添加imooc集合，集合也可以代码自动生成
// 等同于'mongodb://localhost:27017/chat';
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat';
// 链接该 mongo 地址 ，
mongoose.connect(DB_URL);

// 数据模型
const models = {
	user:{
		'user':{type:String, required:true},
		'pwd':{type:String, required:true},
		'type':{type:String, required:true},
		// 头像
		'avatar':{type:String},
		// 简介
		'desc':{type:String},
		// 职位
		'title':{type:String},
		// BOSS 会多出以下俩个字段：公司、待遇
		'company':{type:String},
		'money':{type:String}
	},
	chat:{
		// 当前对话id
		'chatid':{'type':String, require:true},
		// 来自
		'from':{'type':String, require:true},
		// 发送给
		'to':{'type':String, require:true},
		// 是否已读，redux 里根据该属性确定该消息是否已读，得出未读条数，
		'read':{'type':Boolean, require:false},
		'content':{'type':String, require:true,default:''},
		'create_time':{'type':Number, default:Date.now, require:true},
		// 'create_time':{'type':Number, default:Date.now(),require:true},
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}


// 打印连接信息
// mongoose.connection.on('connected', function(){
// 	console.log('mongo connect success')
// })

// console.log() 打印的内容均出现在cmd命令窗口里，
// res.json() 返回内容到页面

// 类似mysql的表，mongo有文档、字段的概念
// 定义文档模型：schema、model
// 一个数据库文档对应一个模型，通过模型对数据库进行操作，
// String、Number 定义数据结构，
// create、remove、update、find、findOne 增删改查

// 创建文档User
// const User = mongoose.model('user', new mongoose.Schema({
// 	user:{type:String, require:true},
// 	age:{type:Number, require:true}
// }))

// 新增数据，每保存一次，就新增数据一次，
// User.create({
// 	user:'lcm',
// 	age:31
// }, function(err,doc){
// 	if(!err){
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
// })

// 为符合第一个参数的数据修改第二个参数值
// User.update({user:'lcm'},{'$set':{age:32}},function(err,doc){
// 	if(!err){
// 		console.log('update success');
// 		User.find({},function(e,d){
// 			console.log(d)			
// 		})
// 	}
// })

// 删除数据，异步执行的回调函数第一个参数都是error
// User.remove({age:30},function(err,doc){
// 	if(!err){
// 		console.log('delete success');
// 		User.find({},function(e,d){
// 			console.log(d)			
// 		})
// 	}
// })
