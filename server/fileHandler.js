var url = require('url');
var fs = require('fs');
var path = require('path');

var contentType = function(ext) {
  var ct;

  switch (ext) {
  case '.html':
      ct = 'text/html';
      break;
  case '.css':
      ct = 'text/css';
      break;
  case '.js':
      ct = 'text/javascript';
      break;
  default:
      ct = 'text/plain';
      break;
  }

  return {'Content-Type': ct};
};

exports.handleRequest = function(request, response) {
  var route = url.parse(request.url).pathname;
  if (route === '/'){
    fs.readFile('client/index.html', function (err, html) {
      if(err) {
        throw err;
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
      }
    });
  } else {
    var filepath = 'client' + request.url;
    var fileext = path.extname(filepath);
    path.exists(filepath, function (file) {
      if (file) {
        fs.readFile(filepath, function (err, content) {
          if (err) {
            response.writeHead(404);
            response.end();
          } else {
            response.writeHead(200, contentType(fileext));
            response.end(content);
          }
        });
      } else {
        response.writeHead(404);
        response.end();
      }
    });
  }
};