'use strict';

var Hapi = require('hapi');
var path = require('path');
var settings = require('config');
var chalk = require('chalk');
var Good = require('good');

//Custome lib
var $ = require('./lib/index');

//routes
var routes = require('./routes');

//models
var models = require('./models');

var server = new Hapi.Server({
   connections:{
    routes:{
      cors:settings.cors
    }
  }
});

server.connection({ port: settings.port,  host: settings.host });

server.on('response', function (request) {
  $.log.info(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

module.exports = server;

var initDb = function(cb){
  var sequelize = models.sequalize;
  cb();
};

var setup = function(done){

  server.route(routes);

  initDb(function(){
    done();
  });
};

var start = function(){
  // register plugins to server instance
  server.register({
    register: Good,
    options: {
      ops : false,
      reporters: {
        reporter: [
          {
            module: 'good-console',
            args: [{ response: '*', log: '*'}]
          }, 'stdout'
        ]
      }
    }
  },
  function (err) {
    if (err) {
      $.log.error(err);
      process.exit(1);
    }
    server.start(function(err){
      if (err) {
        $.log.error(err);
        process.exit(1);
      }
      console.log(chalk.yellow("#####################################################################################################\n"+
                               "###      ########      ##     ##        ######## ##     ## ########  #### ########  ########      ###\n"+
                               "###      ##     ##     ##     ##        ##       ###   ### ##     ##  ##  ##     ## ##            ###\n"+
                               "###      ##     ##     ##     ##        ##       #### #### ##     ##  ##  ##     ## ##            ###\n"+
                               "###      ########      ##     ##        ######   ## ### ## ########   ##  ########  ######        ###\n"+
                               "###      ##   ##        ##   ##         ##       ##     ## ##         ##  ##   ##   ##            ###\n"+
                               "###      ##    ##  ###   ## ##   ###    ##       ##     ## ##         ##  ##    ##  ##            ###\n"+
                               "###      ##     ## ###    ###    ###    ######## ##     ## ##        #### ##     ## ########      ###\n"+
                               "#####################################################################################################\n"));

      $.log.info('server running at: ' + server.info.uri);
    });
  });
};

if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
  setup(function(){
    start();
  });
};
