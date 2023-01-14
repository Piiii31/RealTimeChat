const io = require('socket.io')(3000)
//socket.io will  create a server with a port 3000

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
            //to storage names with an id 

    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
     //the message will not shown whove have written the message 
        //only the user that will appear
        //broadcast to send the messages to other users 
      
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
//everytime user use our server this function is on  and the function sucket will give the user their own socket