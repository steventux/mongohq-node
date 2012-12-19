
/*
 * GET home page.
 */

exports.index = function(req, res){
  var mongoose = require("mongoose"),
      Content = mongoose.model('Content');
      content = Content.findOne({path: "/"}, function(err, doc) {
        if (err) {}
        res.render('index', { content: doc });
      });
};
