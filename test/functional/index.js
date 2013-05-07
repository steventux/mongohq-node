var helper          = require('../test-helper'),
    Content         = helper.Content,
    Factory         = helper.Factory;

describe('The homepage', function() {

  before(function(done){
    Factory.create('content',function(){});
    this.browser.visit("/").
      then(done,done);
  });
 
  it('should show some headings', function(done){
    this.browser.success.should.be.ok;
    this.browser.text("h1").should.equal("Testing!")
    this.browser.text("h3").should.equal("Some test content");
    done();
  });

  it('should have navigation', function(done){
    this.browser.text("ul.nav li.active a").should.equal("Home");
    this.browser.text("ul.nav li a[href='/projects']").should.equal("Recent work");
    this.browser.text("ul.nav li a[href='/contact']").should.equal("Contact");
    this.browser.text("ul.nav li a[href='/about']").should.equal("About");
    done();
  });

  it('should have some footer text', function(done){
    this.browser.text("div.container p.muted.credit").should.equal("© Laing Solutions 2013. Company # 6376724.");
    done();
  });

});
