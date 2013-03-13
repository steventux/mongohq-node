var mongoose = require('mongoose');

var noDoc = {
  title : "Oops!",
  body : "## That piece of the internet is missing!\n\n[Try this!](/)" 
}

/*
 * GET index.
 */
exports.index = function(req, res){
  var Content = mongoose.model('Content');
  Content.findOne({path : "/"}, 
    function(err, doc) {
      if (err) {
        doc = noDoc
      }
      res.render('index', { content: doc });
  });
}


/*
 * GET content by path.
 */
exports.contentByPath = function(req, res){
  var Content = mongoose.model('Content');
  content = Content.findOne({path : req.params.path}, 
    function(err, doc) {
      if (err) {}
      if (doc == null) {
        doc = noDoc
      };
      res.render('content', { content: doc });
  });
}
