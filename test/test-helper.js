process.env.NODE_ENV = 'test'
process.env.PORT = 3001
process.env.MONGODB_CONN = "mongodb://localhost:27017/lsl_test"

var  Content = require('../models/content')
  ,  Factory = require('factory-lady');

Factory.define('content', Content, {
  title    : "Testing!", 
  path     : '/',
  body     : '### Some test content'
});

module.exports = {
  app             : require('../app'),
  assert          : require('assert'),
  Content         : Content,
  DatabaseCleaner : require('database-cleaner'),
  Factory         : Factory,
  http            : require('http'),
  mongoose        : require('mongoose'),
  zombie          : require('zombie')
}
