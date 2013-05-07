/* Config */
process.env.NODE_ENV = 'test'
process.env.PORT = 3001
process.env.MONGOHQ_URL = "mongodb://localhost:27017/lsl_test"

var  app = require('../app')
  ,  Browser = require('zombie')
  ,  Content = require('../models/content')
  ,  Factory = require('factory-lady')
  ,  http    = require('http')
  ,  mongoose = require('mongoose');

/* Factories */
Factory.define('content', Content, {
  title    : "Testing!", 
  path     : '/',
  body     : '### Some test content'
});

/* Setup */
before(function(done) {
  this.server = http.createServer(app).listen(process.env.PORT);
  this.browser = new Browser({ debug:true, site: "http://localhost:"+process.env.PORT });
  this.databaseCleaner = new DatabaseCleaner('mongodb');
  done();
});
/* Teardown */
after(function(done) {
  //this.browser.close();
  this.databaseCleaner.clean(mongoose.connections[0].db,done);
  this.server.close(done);
});

/* Exports */
module.exports = {
  app             : app,
  Browser         : Browser,
  Content         : Content,
  DatabaseCleaner : require('database-cleaner'),
  Factory         : Factory,
  http            : http,
  mongoose        : mongoose,
  should          : require('should')
}
