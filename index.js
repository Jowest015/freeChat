const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', {msg, id: socket.id});
  });
});

//listen on port 5000

server.listen(5000, () => {
  console.log('listening on *:5000');
});

