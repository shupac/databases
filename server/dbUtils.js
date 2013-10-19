var _mysql = require('mysql');
var util = require('./httpUtils');
var connectionOptions = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat'
};

var connection = _mysql.createConnection(connectionOptions);
connection.connect();

exports.writeUser = function(msg){
  // console.log('message object: ', msg);
  connection.query("select id from users where name = ?", msg.username, function(err, result) {
    if (err) {
      throw err;
    }
    if (result.length) {
      var userID = result[0].id;
      exports.writeRoom(msg, userID);
    } else {
      connection.query("insert into users set name = ?;", msg.username, function(err, result){
        if (err) {
          throw err;
        }
        // console.log("insert new user: " + msg.username, result);
        var userID = result.insertId;
        exports.writeRoom(msg, userID);
      });
    }
  });

};

exports.writeRoom = function(msg, userID){
  connection.query("select id from rooms where name = ?", msg.roomname, function(err, result) {
    if (err) {
      throw err;
    }
    if (result.length) {
      var roomID = result[0].id;
      exports.writeMsg(msg, userID, roomID);
    } else {
      connection.query("insert into rooms set name = ?;", msg.roomname, function(err, result){
        if (err) {
          throw err;
        }
        // console.log("insert new room: " + msg.roomname, result);
        var roomID = result.insertId;
        exports.writeMsg(msg, userID, roomID);
      });
    }
  });

};

exports.writeMsg = function(msg, userID, roomID) {
  connection.query("insert into messages (User_ID, Text, Timestamp, Room_ID) values (" + userID + ", '" + msg.text + "', CURRENT_TIMESTAMP, " + roomID + ");", function(err, result){
    if (err) {
      throw err;
    }
    console.log(userID + ", " + msg.text + ", CURRENT_TIMESTAMP, " + roomID + " written to messages");
  });
};

exports.retrieveAll = function() {
  connection.query("select users.name, messages.text, rooms.name, messages.timestamp from messages join users on messages.user_id = users.id join rooms on messages.room_id = rooms.id;", function(err, result){
    if (err) {
      throw err;
    }
      util.sendResponse(response, result);
  });
};