const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5500', // or '*'
        methods: ['GET', 'POST']
    }
});
 
server.listen(8000);


const users = {}

io.on('connection',socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });


})