const io = require('socket.io')(8000)

const users = {}
console.log("hello");

io.on('connection', socket => {
    socket.on('new-user-join', name => {
        users[socket.id] = name;
       
        console.log("hello");
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message : message, user : users[socket.id]});
    })

})