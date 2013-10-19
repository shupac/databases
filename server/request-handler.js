var util = require('./httpUtils');
var dbUtils = require('./dbUtils');
// var storage = require('./');

// var messageExtend = function(message){
//   message["createdAt"] = new Date();
//   return message;
// };

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  switch (request.method) {
    case 'GET':
      // response.writeHead(headers);
      util.sendResponse(response, {});
      break;

    case 'POST':
      util.collectData(request, function(data) {
        messageObj = JSON.parse(data);
        console.log('message Object', messageObj);
        dbUtils.writeUser(messageObj);
      });
      util.sendResponse(response, "", 201);
      break;

    case 'OPTIONS':
      response.writeHead(headers);
      util.sendResponse(response, "");
      break;

    default:
      util.sendResponse(response, "", 404);
      break;
  }
};
