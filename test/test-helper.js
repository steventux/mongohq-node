process.env.NODE_ENV = 'test'
process.env.PORT = 3001

module.exports = {
  app: require('../app'),
  browser: require('zombie'),
  http: require('http')
};
