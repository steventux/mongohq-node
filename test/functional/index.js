var helper = require('../test-helper'),
    app = helper.app,
    http = helper.http;

describe('homepage', function() {
  before(function() {
    this.server = http.createServer(app).listen(process.env.PORT);
  });

  it('should show intro text');
  
  after(function(done) {
    this.server.close(done);
  });
});
