const express = require('express');
const { Http2ServerRequest } = require('http2');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{cors: {origin: '*'}});

let clients=[];

app.use('/style', express.static(__dirname + '/style'));
app.get('/',(req,res) => res.sendFile(__dirname + '/index.html'))

// io = require('socket.io')(server, { cors: { origin: '*', } });
// io = require('socket.io')(httpServer, {
//     cors: {
//       origin: '*',
//     }
//   });


io.on('connection',(socket)=>{
    // console.log('Connnection Message: someone connected');
    // // clients.push(io);
    // socket.on('message',(msg)=>{
    //     console.log("Connnection Message: "+msg)
    //     io.emit('author',"server Message: prototype3 want to get a process to do some active!");
    //     // socket.broadcast.emit('all',  "this is message from" + msg);
    // });
    // socket.on('accept',(msg)=>{
    //     io.emit('authorRespon',"server Message: "+msg);
    //     // socket.broadcast.emit('all',  "this is message from" + msg);
    // });
    //app login
    socket.on('Applogin',(req)=>{
        io.emit('ApploginValida',req)
        console.log(req)

    });
    //app login response
    socket.on('ApploginValidaResponse',(res)=>{
        io.emit('ApploginResponse',res);
        console.log(res.statu)

    });

    //page login
    socket.on('PageLoginRequest',(req)=>{
        io.emit('PageLoginValida',req)
        console.log(req)

    });
    //page login response
    socket.on('ApproveResponse',(req)=>{
        io.emit('ApproveValida',req)
        console.log(req)

    });

    //publish request
    socket.on('appReturnPublishRes',(res)=>{
        io.emit('publishVali',res)

    });
    socket.on('PublishResponse',(res)=>{
        io.emit('appPublishRes',res)

    });

    //sendErrorMessage
    socket.on('sendErrorMessage',(res)=>{
        console.log(res)
        io.emit('errorMessagePage',res);
    });
})



http.listen(3000,()=>console.log('Listening on port 3000!'));

// const Websocket = require('ws');
// const wss = new Websocket.Server({port:8082});

// wss.on("connection", ws=>{
//     console.log("new client connected!")
// })

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.send('<h1>你好web秀</h1>');
// });

// io.on('connection',function(socket) {
//   //接收数据
//   socket.on('login', function (obj) {                
//       console.log(obj.username);
//       // 发送数据
//       socket.emit('relogin', {
//         msg: `你好${obj.username}`,
//         code: 200
//       });  
//   });
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });