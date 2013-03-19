var helper          = require('../test-helper'),
    assert          = helper.assert,
    app             = helper.app,
    Browser         = helper.zombie,
    Content         = helper.Content,
    Factory         = helper.Factory,
    http            = helper.http,
    mongoose        = helper.mongoose,
    browser         = new Browser(),
    databaseCleaner = new DatabaseCleaner('mongodb');

describe('homepage', function(){

  before(function(){
    http.createServer(app).listen(process.env.PORT);
    Factory.create('content',function(){});
  });
  
  it('should show some headings', function(done){
    browser.visit("http://localhost:" + process.env.PORT + "/", { debug : true }, 
      function () {
        // Uncomment to see the doc source.
        // console.log(browser.document.innerHTML)
        assert.ok(browser.success);
        assert.equal("Testing!", browser.text("h1"))
        assert.equal("Some test content", browser.text("h3"));
        done();
      }
    );
  });

  after(function(){
    databaseCleaner.clean(mongoose.connections[0].db, function() {});
  });
});
