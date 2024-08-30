console.log("server started")
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config({path: "./.env"})
}
const express = require("express")

const { Server: SocketServer } = require('socket.io');
const http = require('http');
const path = require('path');

const cors = require("cors")
// const morgan = require("morgan")
const config = require("./config/config")
const { sequelize } = require("./models")
const cloudinary = require('./middleware/cloudinary');

const app = express();
const server = http.createServer(app);
// app.use(morgan("combined"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static('public'));

cloudinary();

// require('./passport')
require("./routes")(app)

// store socket on global object
global.io = new SocketServer(server, {});
require('./socket');

sequelize.sync({ force: false })
	.then(() => {
		app.listen(config.port, () => console.log(`Express server running on port ${config.port}`));
	})
