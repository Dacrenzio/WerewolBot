module.exports = {
	name: 'help',
	description: "this command says the list of the commands",
	execute(message){
		const embed = require("../functions/sendEmbed.js");

		embed.sendEmbed([149,193,255],"Questa è la lista completa dei comandi:\n"+
			"`-newGame n` inizia un nuovo game con n giocatori\n"+
			"`-join` let a player join a started game\n"+
			"`-chooseRole` seguito dai codici identificativi dei ruoli che si vuole mettere nel mazzo\n"+
			"`-night` inizia la notte per il gruppo mutando i giocatori\n"+
			"`-next` chiama il prossimo ruolo giocante (anche se non in partita o morto)\n"+
			"`-day` finisce la notte e uccide i giocatori uccisi durante la notte\n"+
			"`-startVotation` quando dopo la discussione di giorno si vuole dare inizio alle votazioni\n"+
			"`-vote @player` serve per votare un determinato giocatore in partita\n"+
			"`-unMuteAll` necessario per smutare i giocatori quando non in partita\n\n"+
			"```Comandi specifici per ruolo:```\n"+
			"`-aura @player` comando della Veggente e della Medium, serve a identificare l'aura del giocatore citato\n"+
			"`-heal @player` comando del Guaritore, serve a guarire una volta per partita un morente\n"+
			"`-kill @player1 @player2` comando dei Lupi, uccide un giocatore; quando il giovane lupo è stato mandato al rogo è possibile selezionare due vittime\n"+
			"`-mistic @player` comando del Mago, serve per sapere se il giocatore indicato è un mistico\n"+
			"`-protect @player` comando della Strega, serve per proteggere dai lupi il giocatore scelto\n"
			, message.channel);
	}
}