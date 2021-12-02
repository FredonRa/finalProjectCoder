const express = require("express");
const http = require("http"); 
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(require('./routes/login'));
app.use(require('./routes/register'));

// support parsing of application/json type post data
const server = http.createServer(app);

const socketio = require("socket.io");

const io = socketio(server, {
    cors: {
      origins: "*"
    }
});

io.on('connection', (socket) => {

    socket.on('connected', (user) => {
        console.log("usuario conectado", user)
      });
    
      socket.on('message', (message, user) => {
        let date = new Date();
        let hour = date.getHours();
        hour = hour < 9 ?  "0"+hour : hour
        let mins = date.getMinutes();
        mins = mins < 9 ? "0"+mins : mins 
        let time = `${hour}:${mins}`
        io.emit("messages", {message: message, from: user, time: time});
      });
    
      socket.on('disconnect', () => {
        io.emit('messages', {server: "server", message: "Ha abandonado la sala."})
      })

})

mongoose.connect("mongodb://localhost:27017/tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("Base de datos online");
});

server.listen(3000, () => console.log("servidor inicializado en el puerto 3000", ))