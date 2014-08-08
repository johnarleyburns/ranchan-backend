var mocha = require('mocha');
var assert = require('assert');
var csvparser = require('../lib/csvparser');
//var ranchan = require('../lib/ranchan-server');

var APIeasy = require('api-easy');

//
// Create a APIeasy test suite for our API
//
var suite = APIeasy.describe('api');

//
// Add some discussion around the vowsjs tests.
// Not familiar with vows? Checkout:
// http://vowsjs.org 
//
suite.discuss('When using the API')  
     .discuss('the Ping resource');
     
// Here we will configure our tests to use 
// http://localhost:8080 as the remote address
// and to always send 'Content-Type': 'application/json'
//
suite.use('localhost', 8000)  
     .setHeader('Content-Type', 'application/json')
     //
     // A GET Request to /ping
     //   should respond with 200
     //   should respond with { pong: true }
     //
     .get('/ping')
       .expect(200, { pong: true });
      //
      // A POST Request to /ping
      //   should respond with 200
      //   should respond with { dynamic_data: true }
      //
     //.post('/tests', { dynamic_data: true })
     //  .expect(200, { dynamic_data: true });
       
       
//
// Add more tests
//
suite.undiscuss()  
     .discuss('when authenticating')
     .get('/login')
     .expect(200)
     .expect('should respond with the authorize token', function (err, res, body) {
       var result = JSON.parse(body);
       assert.isNotNull(result.token);

       suite.before('setAuth', function (outgoing) {
         outgoing.headers['x-test-authorized'] = result.token;
         return outgoing;
       });
     })
     //
     // Before we can test our request to /restricted 
     // the request to /login must respond. To ensure this
     // we make a call to .next() before our next call to .get()
     //
     .next()
     .get('/restricted')
       .expect(200, { authorized: true });
       
suite.export(module);
// test non-mod paths on httpd

// verify mod exists in httpd.passwd file
// confirm can authenticate mod with httpd-auth
// confirm non-mod cannot authenticate with httpd-auth
// test mod paths on httpd
/*
*/