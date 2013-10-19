var http = require("http");
var url = require('url');
var requestHandler = require("./request-handler.js");
var roomHandler = require("./roomHandler.js");
var userHandler = require("./userHandler.js");
var fileHandler = require("./fileHandler.js");

var server = http.createServer(function(req, res){
  console.log(req.method, req.url);
  var route = url.parse(req.url).pathname;
  switch (route) {
    case "/classes/messages":
      requestHandler.handleRequest(req, res);
      break;

    case "/classes/rooms":
      roomHandler.handleRequest(req, res);
      break;

    case "/classes/users":
      userHandler.handleRequest(req, res);
      break;

    default:
      fileHandler.handleRequest(req, res);
      break;
  }
});

server.listen(8080, '127.0.0.1');
// server.listen(process.env.PORT || 5000);