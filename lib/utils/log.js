'use strict';

// Load Modules
var Chalk = require('chalk');
var Moment = require('moment');

// Internals
var internals = {};

internals.now =  function(format){
    format = format || 'D MMM HH:mm:ss';
    return Moment().format(format);
};

internals.log = {
    LEVEL: 2,
    LEVELS: {
        'NONE': 0,
        'TRACE': 1,
        'DEBUG': 2,
        'INFO': 3,
        'WARN': 4,
        'ERROR': 5,
        'FATAL': 6,
        'SILENT': 7,
    },
    setLogLevel:  function(str){
        internals.log.LEVEL = Object.keys(internals.log.LEVELS).indexOf(str) || internals.log.LEVEL;
    },
    fatal: function(a){
        if(internals.log.LEVEL <= internals.log.LEVELS.FATAL){
            console.log(internals.now(), Chalk.red('[FATAL]'), a);
        }
    },
    error: function(a){
        if(internals.log.LEVEL <= internals.log.LEVELS.ERROR){
            console.log(internals.now(), Chalk.red('[ERROR]'), a);
        }
    },
    warn: function(a){
        if(internals.log.LEVEL <= internals.log.LEVELS.WARN){
            console.log(internals.now(), Chalk.yellow('[WARN]'), a);
        }
    },
    info: function(a){
        if(internals.log.LEVEL <= internals.log.LEVELS.INFO){
            console.log(internals.now(), Chalk.magenta('[INFO]'), a);
        }
    },
    debug: function(a){
        if(internals.log.LEVEL <= internals.log.LEVELS.DEBUG){
            console.log(internals.now(), Chalk.cyan('[DEBUG]'), a);
        }
    },
    trace: function(a){
        if(internals.log.LEVEL <= internals.log.LEVELS.TRACE){
            console.log(internals.now(), Chalk.green('[TRACE]'), a);
        }
    }
};

// Exports
module.exports =  internals.log;
