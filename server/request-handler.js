var util = require('./httpUtils');
// var storage = require('./storage');
var _mysql = require('mysql');
var connectionOptions = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat'
};

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
      util.sendResponse(response, storage.getMessages());
      break;

    case 'POST':
      util.collectData(request, function(data) {
        messageObj = JSON.parse(data);

        var connection = _mysql.createConnection(connectionOptions);
        connection.connect();

        // var getID = function(table, msg, callback){
        //   connection.query("select id from " + table + " where name = ?", msg.name, function(err, result) {
        //     if (err) {
        //       throw err;
        //     }
        //     if (result.length) {
        //       var userID = result[0].id;
        //       getID('rooms', msg, function(err, result) {
                
        //       });

        //     } else {
        //       connection.query("insert into " + table + " set name = ?;", msg.name, function(err, result){
        //         if (err) {
        //           throw err;
        //         }
        //         var userID = result[0].id;

        //       });
        //     }
        //   });

        // };
        // var insertRow = function(){

        // };

        // connection.query("select id from users where name = ?;", messageObj.username, function(err, result) {
        //   if (err) {
        //     throw err;
        //   }
        //   if (result.length) {
        //     var userID = result[0].id;

        //   } else {
        //     connection.query("insert into users set name = ?;", messageObj.username, function(err, result){
        //       if (err) {
        //         throw err;
        //       }
        //       var userID = result[0].id;

        //     });
        //   }
        // });
        // var msg = {
        //   "username": user,
        //   "text": text,
        //   'roomname': room
        // };

        // get username
        // see if username in users table
        // if yes, retrieve user id
        // if not, create user and retrieve user id




        // get roomname
        // see if room in users table
        // if yes, retrieve room id
        // if not, create room and retrieve room id

        // write to database with user id, txt, and room id and current timestamp



        storage.addMessage(messageObj);
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
