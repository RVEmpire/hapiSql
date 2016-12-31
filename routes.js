var controllers = require('./controllers');

module.exports = [
   {
    method: 'GET',
    path: '/',
    handler: controllers.home.default
  },
  {
    method: 'GET',
    path: '/users',
    handler: controllers.users.get
  },
  {
    method: 'GET',
    path: '/salute/{name}',
    handler: controllers.users.salute
  }
];