'use strict';

var Hapi = require('hapi');
var Sequelize = require('sequelize');

var server = new Hapi.Server();

server.connection({ port : 9000 });


var sequelize = new Sequelize('test', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply){
		reply('Its Working');
	}
});


server.start(function(){
	console.log('server is running!');
});