module.exports = function Moderatore(
  nightNum,
  playerNum,
  auraType,
  playerList,
  playerDying,
  roleListID,
  nightOrder,
  burnedPlayer,
  numberOfVotes,
  ballottaggio,
  numberOfDeadPlayer,
  finished
) {
  this.nightNum = nightNum;
  this.playerNum = playerNum;
  this.auraType = auraType;
  this.playerList = playerList;
  this.playerDying = playerDying;
  this.roleListID = roleListID;
  this.nightOrder = nightOrder;
  this.burnedPlayer = burnedPlayer;
  this.numberOfVotes = numberOfVotes;
  this.ballottaggio = ballottaggio;
  this.numberOfDeadPlayer = numberOfDeadPlayer;
  this.finished = finished;
};
