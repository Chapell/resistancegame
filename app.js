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

var kiskutya = new Player("John", true);
var kiskutya2 = new Player("Mary", false);
var kiskutya3 = new Player("Jasmine", false);

var players = [ kiskutya, kiskutya2, kiskutya3 ];

var elso = new Mission(players);
elso.doMission();

console.log();