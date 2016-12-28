'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port : 9000 });

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