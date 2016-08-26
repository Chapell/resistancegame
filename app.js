"use strict";

Array.prototype.nextLeader = function() {
    for (var i = 0; i < this.length; i++) {
        var next = i + 1;
        if (this[i].leader == true)
        {
            this[i].leader = false;
            if (next >= this.length) {
                this[0].leader = true;
            }
            else {
                this[next].leader = true;
            }
            break;
        }
    }
}

Array.prototype.getLeader = function() {
    for (var i = 0; i < this.length; i++) {
        if (this[i].leader == true) {
            return this[i];
        }
    }
}

class Player {
    constructor(name, isLeader) {
        this.name = name;
        this.leader = isLeader;
        this.resistance = false;
        this.spy = false;
    }
}

class Mission {
  constructor(players) {
      this.players = players;
  }

  nextRound() {
      // Next Leader
      this.players.nextLeader();

      // Leader selects team
      var missionTeam = this.selectMissionTeam(this.players);

      // Vote for team
      //VoteTeam(players);

      // Do Mission
      //result = DoMission(missionTeam);

      //return result;
  }

  selectMissionTeam(players) {
      var result = [];
      var arr = [];
      while(arr.length < 2){
          var randomnumber=Math.ceil(Math.random() * players.length - 1);
          var found=false;
          for(var i=0;i<arr.length;i++){
              if(arr[i]==randomnumber){found=true;break}
            }
            if(!found)arr[arr.length]=randomnumber;
        }

        for (var i = 0; i < arr.length; i++) {
            result.push(players[arr[i]]);
        }
        return result;
  }

  doMission() {
      this.nextRound();
  }
}

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('ready', function(msg){
    console.log('ready: ', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var playerOne = new Player("John", true);
var playerTwo = new Player("Mary", false);
var playerThree = new Player("Jasmine", false);

var players = [ playerOne, playerTwo, playerThree ];

var firstMission = new Mission(players);
firstMission.doMission();

console.log();