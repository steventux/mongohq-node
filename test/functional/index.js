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

  it('should have navigation', function(done){
    assert.equal("Home", browser.text("ul.nav li.active a"));
    assert.equal("Recent work", browser.text("ul.nav li a[href='/projects']"));
    assert.equal("Contact", browser.text("ul.nav li a[href='/contact']"));
    assert.equal("About", browser.text("ul.nav li a[href='/about']"));
    done();
  });

  it('should have some footer text', function(done){
    assert.equal("© Laing Solutions 2013. Company # 6376724.", browser.text("div.container p.muted.credit"));
    done();
  });


  after(function(){
    databaseCleaner.clean(mongoose.connections[0].db, function() {});
  });
});
