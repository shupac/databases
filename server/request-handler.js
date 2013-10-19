var util = require('./httpUtils');
var dbUtils = require('./dbUtils');
var Sequelize = require("sequelize");
var chatSequelize = new Sequelize("chatSequelize", "root", null);

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

var Users = chatSequelize.define('Users', {
  username: Sequelize.STRING
});

var Rooms = chatSequelize.define('Rooms', {
  roomname: Sequelize.STRING
});

var Messages = chatSequelize.define('Messages', {
  text: Sequelize.STRING
});

Users.hasMany(Messages);
Rooms.hasMany(Messages);

Users.sync();
Messages.sync();
Rooms.sync();

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  switch (request.method) {
    case 'GET':
      response.writeHead(headers);
      dbUtils.retrieveAll(response);
      // Messages.findAll().success(function(messages) {

      // });
      break;

    case 'POST':
      util.collectData(request, function(data) {
        var userId, roomId;
        messageObj = JSON.parse(data);
        // console.log('message Object', messageObj);
        Users.find({ where: {username: messageObj.username}}).success(function(user) {
          if(user) {
            userId = user.id;
            Rooms.find({ where: {roomname: messageObj.roomname} }).success(function(room){
              if (room) {
                roomId = room.id;
                Messages.build({UserId:userId, RoomId: roomId, text:messageObj.text}).save().success(function() {
                  // console.log("Message added to db");
                });
              } else {
                var newRoom = Rooms.build({roomname: messageObj.roomname});
                newRoom.save().success(function(newRoom){
                  roomId = newRoom.id;
                  Messages.build({UserId:userId, RoomId: roomId, text:messageObj.text}).save().success(function() {
                    // console.log("Message added to db");
                  });
                });
              }
            });
          } else {
            var newUser = Users.build({username: messageObj.username});
            newUser.save().success(function(newUser){
              userId = newUser.id;
              Rooms.find({ where: {roomname: messageObj.roomname} }).success(function(room){
                if (room) {
                  roomId = room.id;
                  Messages.build({UserId:userId, RoomId: roomId, text:messageObj.text}).save().success(function() {
                    // console.log("Message added to db");
                  });

                } else {
                  var newRoom = Rooms.build({roomname: messageObj.roomname});
                  newRoom.save().success(function(newRoom){
                    roomId = newRoom.id;
                    Messages.build({UserId:userId, RoomId: roomId, text:messageObj.text}).save().success(function() {
                      // console.log("Message added to db");
                    });
                  });
                }
              });
            });
          }

        });
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
