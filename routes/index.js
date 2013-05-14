var Content = require('./../models/content'),
    mongoose = require('mongoose');

var noDoc = {
  title : "Oops!",
  body : "## That piece of the internet is missing!\n\n[Try this!](/)" 
}

exports.login = function(req, res) {
  res.render('login');
}

/*
 * GET index.
 */
exports.index = function(req, res){
  Content.findOne({path : "/"}, 
    function(err, doc) {
      res.render('index', { content: doc });
  });
}


/*
 * GET content by path.
 */
exports.contentByPath = function(req, res){
  Content.findOne({path : req.params.path}, 
    function(err, doc) {
      if (err) {}
      if (doc == null) {
        doc = noDoc
      };
      res.render('content', { content: doc });
  });
}
