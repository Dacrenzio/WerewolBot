module.exports = function PlayerRole(
  id,
  fazione,
  aura,
  misticismo,
  tratto,
  alive,
  votes
) {
  this.id = id;
  this.aura = aura;
  this.misticismo = misticismo;
  this.fazione = fazione;
  this.tratto = tratto;
  this.alive = alive;
  this.votes = votes;
};
