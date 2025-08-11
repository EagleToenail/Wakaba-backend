console.log("server started")
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config({path: "./.env"})
}
const express = require("express");

const { Server: SocketServer } = require('socket.io');
const http = require('http');
const path = require('path');

const cors = require("cors")
const config = require("./config/config")
const { sequelize } = require("./models")
const preciousMetalsPriceController = require('./controllers/PreciousMetalsPriceController');

const app = express();
const server = http.createServer(app);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(config.cors));
app.use('/public', express.static('public'));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));

preciousMetalsPriceController.create();

require('./passport')
require("./routes")(app)

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// store socket on global object
global.io = new SocketServer(server, {cors: config.cors });
	require('./socket');


  sequelize.sync({ force: false })
	.then(() => {
		// server.listen(config.port,() => console.log(`Express server running on port ${config.port}`));//development
		server.listen(config.port, '172.31.0.201',() => console.log(`Express server running on port ${config.port}`));//production
	})
