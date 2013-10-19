exports.sendResponse = function(response, obj, status) {
  status = status || 200;
  response.writeHead(status);
  response.end(JSON.stringify(obj));
  return;
};

exports.collectData = function(request, callback) {
  var data = "";
  request.on('data', function(chunks) {
    data += chunks;
  });
  request.on('end', function(){
    callback(data);
  });
};