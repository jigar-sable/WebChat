const io = require('socket.io')(8002)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log("New User Joined: ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', name => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})