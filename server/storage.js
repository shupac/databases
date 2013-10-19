var messages = [];
var users = {};
var rooms = {};

exports.addMessage = function(message) {
  messages.push(message);

  var room = message.roomname;
  var user = message.username;

  users[user] = true;
  rooms[room] = true;
};

exports.getMessages = function() {
  return messages;
};

exports.filterByUser = function(username) {
  var results = [];
  for(var i = 0; i < messages.length; i++) {
    if(messages[i].username === username) {
      results.push(messages[i]);
    }
  }
  return results;
};

exports.filterByRoom = function(roomname) {
  var results = [];
  for(var i = 0; i < messages.length; i++) {
    if(messages[i].roomname === roomname) {
      results.push(messages[i]);
    }
  }
  return results;
};

exports.getUsers = function() {
  return Object.keys(users);
};

exports.getRooms = function() {
  return Object.keys(rooms);
};