module.exports = function (app) {
  'use strict';

  app.use('/trucker', require('./api/Trucker'));
  app.use('/containerGuy', require('./api/ContainerGuy'));
}