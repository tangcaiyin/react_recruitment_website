const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const model = require('./model');
const Chat = model.getModel('chat');
const app = express();

// 清空聊天记录
// Chat.remove({},function(err,doc){})

// 实现后端服务与 socket 的协作
const server = require('http').Server(app)
const io = require('socket.io')(server)

// io 是全局的连接请求，
// socket 是当前连接请求 
io.on('connection',function(socket){
	// 服务端启动命令行里打印相关信息，表明连接成功
	console.log('user login')
	// 监听 redux 里发射的 sendmsg 事件，获取数据，
	socket.on('sendmsg',function(data){
		console.log(data)
		const {from,to,msg} = data;
		// from、to 两方的 id 合并，
		const chatid = [from,to].sort().join('_');
		// 创建新数据对象，
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			console.log('doc：'+doc)
			// 全局连接发射事件，通知所有 socket 接受数据
			io.emit('recvmsg',Object.assign({},doc._doc))
		})
	})
	// socket.close();
})

const userRouter = require('./user')

app.use(cookieParser());
app.use(bodyParser.json())

// 地址匹配 user，都跳转到 userRouter 路由
app.use('/user',userRouter)

// app.listen(9093,function(){
server.listen(9093,function(){
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