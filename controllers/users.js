"use strict";

var models = require("../models");
var $ = require("../lib/index");
var internals = {};

internals.get = function (request, reply) {
	models.users.findAll()
	.then(function(data) {
		if(data){
			return reply(null, { message: "Data has been fetched!", success: true, data: data })
		} else {
			return reply(null, { message:"Failed to fetch data", success: false });
		}
	})
	.catch(function(error) {
		$.log.error(error);
		return reply(null, { message: "Error occured while getting user info", success: false });
	});
};

internals.insert = function (request, reply) {
	var userEmail = request.payload.email;
	var userName = request.payload.name;

	models.users.create({
		email: userEmail,
		name: userName,
	})
	.then(function(data) {
		if (data.dataValues) {
			return reply(null, { message: "Data has been inseted!", success: true, data: data.dataValues });
		} else {
			return reply(null, { message:"Failed to insert", success: false });
		}
	})
	.catch(function(error) {
		$.log.error(error);
		return reply(null, { message: "Error occured while inserting user info", success: false });
	});
};

internals.delete = function(request, reply) {
	var userEmail = request.payload.email;

	models.users.destroy({
		where:{
			email: userEmail
		}
	})
	.then(function(data) {
		if(data){
			return reply(null, { message: "Data has been deleted!", success: true });
		} else {
			return reply(null, { message:"Failed to delete", success: false });
		}
	})
	.catch(function(error) {
		$.log.error(error);
		return reply(null, { message: "Error occured while deleting user info", success: false });
	});
};

internals.update = function(request, reply) {
	var userEmail = request.payload.email;
	var userName = request.payload.name;
	models.users.update(
	{
		name : userName,
	},
	{
		fields: ["name"],
		validate: true,
		where:
		{
			email: userEmail
		}
	})
	.then(function(data) {
		if(data == 1) {
			return reply(null, { message: "Updated Successfully", success: true });
		} else {
			return reply(null, { message: "Failed to update", success: false });
		}
	})
	.catch(function(error) {
		$.log.error(error);
		return reply(null, { message: "Error occured while updating user info", success: false });
	});
};

module.exports = internals
