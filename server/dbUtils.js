var getUserID = function(msg){
  connection.query("select id from users where name = ?", msg.username, function(err, result) {
    if (err) {
      throw err;
    }
    if (result.length) {
      var userID = result[0].id;
      getRoomID(msg, userID);
    } else {
      connection.query("insert into users set name = ?;", msg.username, function(err, result){
        if (err) {
          throw err;
        }
        var userID = result[0].id;
        getRoomID(msg, userID);
      });
    }
  });

};

var getRoomID = function(msg, userID){
  connection.query("select id from rooms where name = ?", msg.roomname, function(err, result) {
    if (err) {
      throw err;
    }
    if (result.length) {
      var roomID = result[0].id;
      writeMsg(msg, userID, roomID);

      // });

    } else {
      connection.query("insert into rooms set name = ?;", msg.roomname, function(err, result){
        if (err) {
          throw err;
        }
        var roomID = result[0].id;
        writeMsg(msg, userID, roomID);
      });
    }
  });

};

// var writeMsg = function