'use strict';

var controllers = require('./controllers');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: controllers.home.default
  },
  {
    method: 'GET',
    path: '/users/get',
    handler: controllers.users.get
  },
  {
    method: 'POST',
    path: '/users/update',
    handler: controllers.users.update,
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          name: Joi.string().min(6).max(50).required(),
          password: Joi.string().min(6).max(20).required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/users/insert',
    handler: controllers.users.insert,
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          name: Joi.string().min(6).max(50).required(),
          password: Joi.string().min(6).max(20).required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/users/delete',
    handler: controllers.users.delete,
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: controllers.users.login,
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).max(20).required()
        }
      }
    }
  }
];
