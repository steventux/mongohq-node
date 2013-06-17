var helper          = require('../../test-helper'),
    app             = helper.app,
    cheerio         = require('cheerio'),
    Content         = helper.Content,
    Factory         = helper.Factory,
    passportStub    = helper.passportStub,
    passwordHash    = helper.passwordHash,
    request         = helper.request,
    User            = helper.User;

describe('Admin contents page', function() {

  before(function(done){
    passportStub.install(app);
    Factory.create('content',{ path:"foo",title:"Foo!",body:"### Some foo content" },function(){});
    Factory.create('content',{ path:"bar",title:"Bar!",body:"### Some bar content" },function(){});
    Factory.create('content',{ path:"meh",title:"Meh!",body:"### Some meh content" },function(){});
    Factory.create('user', { username : 'admin', password : passwordHash.generate('blank') }, function(){
      User.findOne({username: 'admin'}, function(err, user) {
        console.log(user);
        passportStub.login(user);
        done();
      });
    });
  });

  after(function(done){
    passportStub.uninstall();
    done();
  });

  it('should display contents index', function(done){
    request.get('http://localhost:3001/admin/contents', function(err, res, body) {
      var $ = cheerio.load(body);
      res.statusCode.should == 200;
      console.log(body);
      $('td').eq(0).text().should.equal('Foo!');
      $('td').eq(1).text().should.equal('foo');
      $('td').eq(2).text().should.equal('Edit');
      $('td').eq(3).text().should.equal('Bar!');
      $('td').eq(4).text().should.equal('bar');
      $('td').eq(5).text().should.equal('Edit');
      $('td').eq(6).text().should.equal('Meh!');
      $('td').eq(7).text().should.equal('meh');
      $('td').eq(8).text().should.equal('Edit');
      done();
    });
  });
});

describe('GET new', function(){
  it('should display a form to create new content', function(done){
    request.get('http://localhost:3001/admin/contents/new', function(err, res, body) {
      var $ = cheerio.load(body);
      res.statusCode.should.be.ok;
      done();
    });
  });
});

describe('POST create', function(){
  it('should accept a form submission and save new content', function(done){
    done();
  });
});

describe('GET edit', function(){
  it('should display a form to edit existing content', function(done){
    done();
  });
});

describe('PUT update', function(){
  it('should accept a form submission and update existing content', function(done){
    done();
  });
});
