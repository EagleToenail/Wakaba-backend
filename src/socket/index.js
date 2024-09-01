const { io } = global;

const user = require('./events/user');
const chat = require('./events/chat');
const room = require('./events/room');
const group = require('./events/group');

io.on('connection', (socket) => {
  // console.log("socket connection start")
  user(socket);
  room(socket);
  chat(socket);
  group(socket);
});
