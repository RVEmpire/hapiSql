'use strict';

var Hapi = require('hapi');

var path = require('path');
var settings = require('config');

//routes
var routes = require('./routes');
//models
var models = require('./models');


// var Sequelize = require('sequelize');

var server = new Hapi.Server({
  routes: {cors: true}
});

server.connection({ port:settings.port,  host:settings.host});

module.exports = server;

var initDb = function(cb){
  var sequelize = modules.sequalize;
  cb();
};

var setup = function(done){

  server.route(routes);

  initDb(function(){
    done();
  });
};

var start = function(){
  server.start(function(){
    server.log('info', 'Server running at: ' + server.info.uri);
  });
};

// If someone runs: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
  setup(function(){
    start();
  });
};
