'use strict';

var supertest = require('supertest');
var app = require('../../app');
var expect = require('expect.js');
var faker = require('faker');
faker.locale = 'fr';

var config = require('../../config/env/test');


var randomName = faker.commerce.productName();
var randomContent = faker.lorem.paragraph();


function request() {
  return supertest(app.listen());
}

// This agent refers to PORT where program is runninng.

var server = supertest.agent(config.server.url);
// console.log(config.server.url);
// UNIT test begin

describe('CRUD Message',function(){
  var id

  it('post a message',function(done){
    // calling home page api
    server
    request()
    .post('/api/message')
    .send({
      name: randomName,
      content: randomContent
    })
    .set('Content-Type', 'application/json')
    .end(function(err,res){
        // console.log(res.body)
        // expect(res.body).to.not.be.empty();
        expect(typeof res.body).to.eql('object')
        expect(res.body.meta.code).to.eql(200)
        id = res.body.data.id
        //console.log(id);
        done();
    });
  });


  it('get a message - 200',function(done){
    server
    request()
    .get('/api/message/' + id)
    .set('Content-Type', 'application/json')
    .end(function(err,res){
        //console.log(res.body)
        expect(res.body).to.not.be.empty();
        expect(typeof res.body).to.eql('object')
        expect(res.body.data).to.have.key('id');
        expect(res.body.data.id).to.eql(id)
        expect(res.body.meta.code).to.eql(200)
        done();
    });
  });

  it('get a message - 404',function(done){
    server
    request()
    .get('/api/message/qsd' + id)
    .set('Content-Type', 'application/json')
    .expect(404)
    .end(function(err,res){
        //console.log(res.body)
        //expect(res.body).to.not.be.empty();
        // expect(res.body.meta.ok).to.eql(false)
        done();
    });
  });

  it('get a collection of message',function(done){
    server
    request()
    .get('/api/messages')
    .set('Content-Type', 'application/json')
    .end(function(err,res){
        //console.log(res.body)
        expect(res.body).to.not.be.empty();
        expect(typeof res.body).to.eql('object')
        expect(err).to.eql(null)
        expect(res.body.data.map(function (item){return item.id})).to.contain(id)
        expect(res.body.meta.code).to.eql(200)
        done();
    });
  });

  it('update a message', function(done){
    server
    request()
    .put('/api/message/' + id)
    .send({
      name: randomName + 'update',
      content: randomContent + 'update'
    })
    .set('Content-Type', 'application/json')
    .end(function(err,res){
        //console.log(res.body)
        expect(err).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.meta.ok).to.eql(true)
        expect(res.body.meta.code).to.eql(200)
        done();
    });
  })
  it('checks an updated object', function(done){
      server
      request()
      .get('/api/message/' + id)
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        // console.log(res.body)
        expect(err).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.data.id).to.eql(id)
        expect(res.body.data.name).to.eql(randomName + 'update')
        expect(res.body.data.content).to.eql(randomContent + 'update')
        done()
      })
  })

  it('removes an object', function(done){
      server
      request()
      .delete('/api/message/' + id)
      .end(function(err, res){
        // console.log(res.body)
        expect(err).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.meta.ok).to.eql(true)
        expect(res.body.meta.code).to.eql(200)
        done()
      })
  })

});
