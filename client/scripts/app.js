// YOUR CODE HERE:
var useURL = 'http://127.0.0.1:8080/classes/messages';

var chatUser = window.location.search.split('=')[1];
var _msgResults;
var lastMsgTime = 0;
var filter = 'lobby';
var friends = {};
var scrollPosition;


var sendChat = function(user, text, room) {
  user = user || chatUser;
  text = text || $('.msgInput').val();
  room = room || filter;
  var msg = {

    // "username": chatUser,
    // "text": $('.msgInput').val(),
    // 'roomname': 'lobby'
    "username": user,
    "text": text,
    'roomname': room
  };
  var stringified = JSON.stringify(msg);
  $.ajax({
    url : useURL,
    type : 'POST',
    data : stringified,
    success : function() {
      scrollPosition = undefined;
      retrieve();
    }
  });
  $('.msgInput').val('');
};

var retrieve = function(room) {
  $.ajax({
    url : useURL,
    type : 'GET',
    // data : {
    //   order: "-createdAt",
    //   limit: 200
    // },
    success : function(data) {
      _msgResults = JSON.parse(data);
      displayByRoom(filter);
      buildChatRooms();
    }
  });
};

var buildChatRooms = function() {
  var users = {};
  var chatRooms = {};
  $('.rooms').text('');
  $('.users').text('');
  for (var i = 0; i < _msgResults.length; i++) {
    var room = _msgResults[i].roomname;
    var user = _msgResults[i].username;
    if (!chatRooms[room]) {
      chatRooms[room] = 1;
      $('.rooms').append('<li><a href="#" class="roomLink">' + escapeString(room) + '</a></li>');
    } else {
      chatRooms[room]++;
    }

    if (!users[user]) {
      users[user] = 1;
      var friendDisplay = 'none';
      if(friends[user]) {
        friendDisplay = 'inline';
      }

      $('.users').append('<li><a href="#" class="userLink">' + escapeString(user) + '</a><span class="friend" style="display:'+friendDisplay+'">*</span></li>');
    }
  }
  $('a.roomLink').on('click', function(){
    filter = $(this).text();
    scrollPosition = undefined;
    displayByRoom( filter );
  });
  $('a.userLink').on('click', function(){
    var thisUser = $(this).text();
    friends[thisUser] = !friends[thisUser];
    $(this).parent().find('> .friend').toggle();
    retrieve();
  });
  return chatRooms;
};

var displayByRoom = function(target) {
  target = target || 'lobby';
  $('ul.chatMsgs').text('');
  var filtered = _(_msgResults).each(function(msgData){
    if (msgData.roomname === target) {
      var node = $('<li>' + escapeString(msgData.username, msgData) + ': ' + escapeString(msgData.text, msgData) + '</li>');
      if(friends[msgData.username]) {
        node.addClass('bold');
      }
      $('.chatMsgs').prepend(node);
    }
  });
  if (scrollPosition === undefined) {
    scrollPosition = $('ul.chatMsgs')[0].scrollHeight;
  }
  $('ul.chatMsgs').scrollTop(scrollPosition);
  $('ul.chatMsgs').scroll(function() {
    scrollPosition = $('ul.chatMsgs')[0].scrollTop;
    // console.log(scrollPosition);
  });
};

var escapeString = function(string, data) {
  if (string !== undefined && string !== null) {
    var returnString = '';
    var specChars = {
     "&": "&amp",
     "<": "&lt",
     ">": "&gt",
     '"': "&quot",
     "'": "&#x27",
     '/': "&#x2F",
     "$": "bling"
    };
    for (var i = 0; i < string.length; i++) {
      if (specChars[ string[i] ] === undefined) {
        returnString += string[i];
      } else {
        returnString += specChars[ string[i] ];
      }
    }
    return returnString;
  }
};

$(document).ready(function() {
  retrieve();
  setInterval(retrieve, 2000);

  $('.msgInput').on('keypress', function(event) {
    if (event.which === 13 && $('.msgInput').val() !== '') {
      sendChat();
    }
  });


  sendChat('shu', 'hello', 'lobby');
  sendChat('shu', 'world', 'lounge');
  sendChat('shu', 'testing', 'club');
  sendChat('joe', 'microphone', 'lobby');
  sendChat('joe', 'speakers', 'lounge');
  sendChat('joe', 'cables', 'club');
  sendChat('jill', 'books', 'lobby');
  sendChat('jill', 'puppies', 'lounge');
  sendChat('jill', 'brunch', 'club');
});