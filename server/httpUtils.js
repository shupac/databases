var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

exports.sendResponse = function(response, obj, status) {
  status = status || 200;
  response.writeHead(status, headers);
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