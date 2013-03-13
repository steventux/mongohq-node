
/**
 * Module dependencies.
 */

var ejs       = require('ejs')
  , express   = require('express')
  , http      = require('http')
  , markdown  = require('markdown').markdown
  , mongoose  = require('mongoose')
  , partials  = require('express-partials')
  , path      = require('path')
  , routes    = require('./routes')
  , user      = require('./routes/user');
  
/**
 * Mongoose config 
 */
mongoose.set('debug', true);
mongoose.connect("mongodb://" + process.env.MONGODB_CONN);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

  console.log("Connected to MongoDB");
  
  var contentSchema = mongoose.Schema({
    title: String, path: String, body: String
  }, { collection: 'contents' } );
  
  mongoose.model('Content', contentSchema, 'contents');

});

/**
 * EJS / Markdown filter
 */
ejs.filters.markdown = function(obj){
  return markdown.toHTML(obj);
}

/**
 * App config 
 */
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(partials()); 
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);


// app is a callback function or an express application
module.exports = app;
if (!module.parent) {
  http.createServer(app).listen((process.env.PORT || 3000), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}
