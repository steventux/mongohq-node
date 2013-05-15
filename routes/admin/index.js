var Content = require('./../../models/content');

/*
 * GET index.
 */
exports.index = function(req, res){
  res.render('admin/index', { user: req.user });
}

/*
 * GET contents.
 */
exports.contents = function(req, res){
  var contents = Content.find(function(e, docs){
    res.render('admin/contents', { contents : (e ? [] : docs) });
  });
}
