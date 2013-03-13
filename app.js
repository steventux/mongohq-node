
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
  , routes    = require('./routes');
  
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

// Redundant middleware as the catchall route handles this.
// I still feel better knowin it's there though.
app.use(function(req, res, next){
  res.send(404, 'That piece of the internet is missing.');
});

/**
 * Routing
 */
app.get('/', routes.index);

// Give other specific routes priority by placing them before this one
app.get('/:path', routes.contentByPath);


// Export the app for tests/console debugging.
module.exports = app;

if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}
