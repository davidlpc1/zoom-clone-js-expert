const server = require('http').createServer((request,response) => {
    response.writeHead(204, {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'OPTIONS, POST , GET'
    })
    response.end('Hey There!')
})

const socketio = require('socket.io')
const io = socketio(server, {
    cors: {
        origin:'*',
        credentials: false
    }
})

io.on('connection',socket => {
    console.log('connection',socket.id)
    socket.on('join-room', (roomId, userId) => {
        // All users in that room will receive a event
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected',userId)
        socket.on('disconnect',() => {
            console.log('disconnected!',roomId,userId)
            socket.to(roomId).broadcast.emit('user-disconnected',userId)
        })
    })
})

const PORT = process.env.PORT || 3000
const startServer = () => {
    const { address, port } = server.address()
    console.info(`App running at ${address}:${port}`)
}

server.listen(PORT, startServer)