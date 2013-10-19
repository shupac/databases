/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var chatSequelize = new Sequelize("chatSequelize", "root", null);
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Users = chatSequelize.define('Users', {
  username: {
    type: Sequelize.STRING,
    get: function() {
      return this.username;
    }
  }
});

var Rooms = chatSequelize.define('Rooms', {
  roomname: {
    type: Sequelize.STRING,
    get: function() {
      return this.roomname;
    }
  }
});

var Messages = chatSequelize.define('Messages', {
  text: {
    type: Sequelize.STRING,
    get: function() {
      return this.text;
    }
  }
});

Users.hasMany(Messages);
Rooms.hasMany(Messages);
/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
Users.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = Users.build({username: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    Users.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

Messages.sync();
Rooms.sync();