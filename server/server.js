const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express();

app.use(cookieParser());
app.use(bodyParser.json())

// 地址匹配 user，都跳转到 userRouter 路由
app.use('/user',userRouter)

app.listen(9093,function(){
	console.log('Node app start at port 9093')
})


// app.get('/', function(req,res){
// 	res.send('<h1>Hello World!</h1>')
// })

// 浏览器访问：http://localhost:9093/data
// app.get('/data', function(req,res){
// 	// User.find({})，查询所有数据，
// 	// User.find({user:'hlx'})，查询并筛选数据，返回的是数组
// 	// User.findOne({user:'hlx'})，查询并筛选数据，仅返回一条数据，是JSON对象,
// 	User.findOne({}, function(err, doc){
// 		// 向页面发送json格式数据
// 		res.json(doc)
// 	})
// })