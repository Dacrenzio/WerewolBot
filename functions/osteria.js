module.exports = {
  sing(moderatore, message) {
    console.log("entrato qua");
    const embed = require("../functions/sendEmbed.js");
    const f = require("../figures.js");

    let isBardIn = moderatore.roleListID.includes(f.bardo);
    let isOsteIn = moderatore.roleListID.includes(f.oste);

    if (isBardIn || isOsteIn) {
      console.log("c'è o oste o bardo");
      let foundAliveBard = false;
      let foundAliveOste = false;
      let isVeggenteAlive = false;

      for (let player of moderatore.playerList.entries()) {
        if (player[1].id === f.bardo && player[1].alive) {
          foundAliveBard = true;
        }

        if (player[1].id === f.oste && player[1].alive) {
          foundAliveOste = true;
        }

        if (
          player[1].id === f.veggente &&
          (player[1].alive || moderatore.playerDying.includes(player[0]))
        ) {
          isVeggenteAlive = true;
        }
      }

      if (!isVeggenteAlive) {
        embed.sendEmbed(
          [149, 193, 255],
          "Non giungono notizie dall'Osteria.",
          message.channel
        );
        return;
      }

      if (isBardIn) {
        if (isOsteIn) {
          if (foundAliveBard && !moderatore.auraType) {
            //check if bardo is alive and that the aura is clear
            embed.sendEmbed(
              [149, 193, 255],
              "Fu trovata un'anima Pura.",
              message.channel
            );
          } else if (foundAliveOste && moderatore.auraType) {
            //else check if the Oste is alive and the aura is dark
            embed.sendEmbed(
              [149, 193, 255],
              "Fu trovata un'anima Impura.",
              message.channel
            );
          } else {
            //if they' both dead or not in play or the one alive has negative result, say nothing
            embed.sendEmbed(
              [149, 193, 255],
              "Non giungono notizie dall'Osteria.",
              message.channel
            );
          }
        } else {
          //id there's only bard
          if (foundAliveBard && !moderatore.auraType) {
            //check bard conditions
            embed.sendEmbed(
              [149, 193, 255],
              "Fu trovata un'anima Pura.",
              message.channel
            );
          } else {
            embed.sendEmbed(
              [149, 193, 255],
              "Non giungono notizie dall'Osteria.",
              message.channel
            );
          }
        }
      } else {
        //if there's only the Oste
        if (foundAliveOste && moderatore.auraType) {
          //check Oste condition
          embed.sendEmbed(
            [149, 193, 255],
            "Fu trovata un'anima Impura.",
            message.channel
          );
        } else {
          embed.sendEmbed(
            [149, 193, 255],
            "Non giungono notizie dall'Osteria.",
            message.channel
          );
        }
      }
    }
  },
};
