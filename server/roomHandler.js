var util = require('./httpUtils');
var storage = require('./storage');

exports.handleRequest = function(request, response) {

  switch (request.method) {
    case 'GET':
      util.sendResponse(response, storage.getRooms());
      break;

    default:
      util.sendResponse(response, "", 404);
      break;
  }
};
