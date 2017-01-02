var controllers = require('./controllers');

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
    handler: controllers.users.update
  },
  {
    method: 'POST',
    path: '/users/insert',
    handler: controllers.users.insert
  },
    {
    method: 'POST',
    path: '/users/delete',
    handler: controllers.users.delete
  }
];