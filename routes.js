"use strict";

var controllers = require("./controllers");
var Joi = require("joi");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: controllers.home.default
  },
  {
    method: "GET",
    path: "/users/get",
    config: {
      auth: {
        mode: "try",
        strategy: "session"
      },
      handler: controllers.users.get
    }
  },
  {
    method: "POST",
    path: "/users/update",
    config: {
      validate: {
        payload: {
          name: Joi.string().min(6).max(50).required(),
        }
      },
      auth: {
        mode: "try",
        strategy: "session"
      },
      handler: controllers.users.update
    }
  },
  {
    method: "POST",
    path: "/users/insert",
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          name: Joi.string().min(6).max(50).required(),
          password: Joi.string().min(6).max(20).required()
        }
      },
      auth: {
        mode: "try",
        strategy: "session"
      },
      handler: controllers.users.insert
    }
  },
  {
    method: "DELETE",
    path: "/users/delete",
    config: {
      auth: {
        mode: "try",
        strategy: "session"
      },
      handler: controllers.users.delete
    }
  },
  {
    method: "POST",
    path: "/users/login",
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).max(20).required()
        }
      },
      auth: {
        mode: "try",
        strategy: "session"
      },
      handler: controllers.users.login
    }
  },
  {
    method: "GET",
    path: "/users/logout",
    config: {
      auth: {
        mode: "try",
        strategy: "session"
      },
      handler: controllers.users.logout
    }
  }
];
