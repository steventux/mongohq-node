var Content = require('./../../models/content');

/*
 * GET index.
 */
exports.index = function(req, res){
  res.render('admin/index', { user: req.user });
}
