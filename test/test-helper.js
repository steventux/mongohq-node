process.env.NODE_ENV = 'test'
process.env.PORT = 3001

module.exports = {
  app: require('../app'),
  http: require('http')
};
