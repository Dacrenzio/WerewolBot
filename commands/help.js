module.exports = {
  name: "help",
  description: "this command says the list of the commands",
  execute(message) {
    const embed = require("../functions/sendEmbed.js");

    embed.sendEmbed(
      [149, 193, 255],
      "Questa è la lista completa dei comandi:\n" +
        "`-mode auto/manual` questo comando imposta la modalità del bot (auto di default)\n" +
        "`-newGame n` inizia un nuovo game con n giocatori\n" +
        "`-join` fa entrare un giocatore in partita\n" +
        "`-playerList` restituisce una lista dei giocatori in partita\n" +
        "`-roleList` restituisce i ruoli inseriti\n" +
        "`-chooseRole` seguito dai codici identificativi dei ruoli che si vuole mettere nel mazzo\n" +
        "`-night` inizia la notte per il gruppo mutando i giocatori\n" +
        "`-next` chiama il prossimo ruolo giocante (anche se non in partita o morto)\n" +
        "`-day` finisce la notte e uccide i giocatori uccisi durante la notte\n" +
        "`-startVotation` quando dopo la discussione di giorno si vuole dare inizio alle votazioni\n" +
        "`-vote @player` serve per votare un determinato giocatore in partita\n" +
        "`-unMuteAll` necessario per smutare i giocatori quando non in partita\n\n" +
        "```Comandi specifici per ruolo:```\n" +
        "`-act @player` comando per i ruoli notturni generico che si adegua al ruolo del giocatore\n" +
        "`-kill @player1 @player2` comando dei Lupi, uccide un giocatore; quando il giovane lupo è stato mandato al rogo è possibile selezionare due vittime" +
        "`-reset` per riportare il bot alle impostazioni di default",
      message.channel
    );
  },
};
