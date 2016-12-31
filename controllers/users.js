var models = require('../models');

module.exports = {
	get:function (request, reply) {
		try {
			reply(models.user.findAll());
		} catch (err) {
			reply("err", err);
		}
	},
	salute:function (request, reply) {
	  reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
};
