var models = require('../models');

module.exports = {
	get:function (request, reply) {
		models.users.findAll()
		.then(function(data){
			if(data){
				return reply(null, {message: 'Data has been fetched!', success: true, data: data})
			} else {
				return reply(null, {message:'Failed to fetch data', success: false});
			}
		})
		.catch(function(error){
			return reply(null, {message: 'failed to connect to database', success: false});
		})
		
	},
	insert:function (request, reply) {
		var userEmail = request.payload.email;
		var userName = request.payload.name;
		var userUrl = request.payload.email;
	  	models.users.create({
	  		email: userEmail,
	  		name: userName,
	  		url: userUrl
	  	})
	  	.then(function(data){
	  		if(data.dataValues){
	  			return reply(null, {message: 'Data has been inseted!', success: true, data: data.dataValues})
	  		} else {
	  			return reply(null, {message:'Failed to insert', success: false});
	  		}
	  	})
	  	.catch(function(error){
	  		return reply(null, {message: 'failed to connect to database', success: false});
	  	})
	},
	delete: function(request, reply){
		var userEmail = request.payload.email;
		models.users.destroy({
			where:{
				email: userEmail
			}
		})
		.then(function(data){
			if(data){
				return reply(null, {message: 'Data has been deleted!', success: true})
			} else {
				return reply(null, {message:'Failed to delete', success: false});
			}
		})
		.catch(function(error){
			return reply(null, {message: 'failed to connect to database', success: false});
		})
	},
	update:function(request, reply) {
		var userEmail = request.payload.email;
		var userName = request.payload.name;
		var userUrl = request.payload.url;
		models.users.update(
		{
			name : userName,
			url : userUrl
		},
		{
			fields: ['name','url'],
			validate: true,
			where: 
			{
				email: userEmail
			}
		})
		.then(function(data){
			if(data == 1) {
				return reply(null, {message:'Updated Succeefully', success: true});
			} else {
				return reply(null, {message:'Failed to update', success: false});
			}
		})
		.catch(function(error){
			return reply(null, {message: 'failed to connect to database', success: false});
		})
	}
};
