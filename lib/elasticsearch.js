var request = require('request'),
    endpoint = function() {
      return process.env.BONSAI_URL;
    };

exports.search = function(query, callback) {
  request.get(endpoint() + "/lsl-content/content/_search?q=" + query, function(err, res, body){
    if (err){
      callback({ total : 0, error : err });
    } else {
      var json = JSON.parse(body);
      callback(json.hits);
    }
  });
};

exports.submit = function(content) {
  request({url: endpoint() + "/lsl-content/content/" + content.path.replace('/','-'), 
           body: JSON.stringify({title: content.title, body: content.bodyText(), url: content.path}),
           method: 'POST'},
    function(err, res, body){
      if (err){
        console.log(err);
      } else {
        console.log(body);
      }
    });
};
