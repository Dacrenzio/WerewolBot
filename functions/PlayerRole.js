module.exports = class PlayerRole {
  id = 0;
  fazione = "neutral";
  aura = false;
  misticismo = false;
  tratto = [];
  alive = false;
  votes = [];

  setID(id) {
    this.id = id;
  }

  assignStandardParameters() {
    this.fazione = "villaggio";
    this.aura = false;
    this.misticismo = false;
    this.tratto = [];
    this.alive = true;
    this.votes = [];
  }
};
