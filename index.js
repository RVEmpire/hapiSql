'use strict';

var Hapi = require('hapi');
var mysql = require('mysql');
var server = new Hapi.Server();

server.connection({ port : 9000 });

var mysqlConnection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1234',
	database: 'test'
});

mysqlConnection.connect();

mysqlConnection.query('select * from user', function(err, rows, fields){
	console.log('Name: ' + rows[0].name + ' Email: ' + rows[0].email);
});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply){
		reply('Its Working');
	}
});

mysqlConnection.end();

server.start(function(){
	console.log('server is running!');
});