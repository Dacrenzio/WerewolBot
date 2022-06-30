module.exports = {
  sing(moderatore, message) {
    const embed = require("../functions/sendEmbed.js");
    const f = require("../figures.js");

    let isBardIn = moderatore.roleListID.includes(f.bardo);
    let isOsteIn = moderatore.roleListID.includes(f.oste);

    if (isBardIn || isOsteIn) {
      let foundAliveBard = false;
      let foundAliveOste = false;
      let isVeggenteAlive = false;

      for (let playerRole of moderatore.playerRoleList.values()) {
        //checking if the bardo and the osteria are alive
        if (playerRole.id === f.bardo && playerRole.alive) {
          foundAliveBard = true;
          continue;
        }

        if (playerRole.id === f.oste && playerRole.alive) {
          foundAliveOste = true;
          continue;
        }

        if (
          playerRole.id === f.veggente &&
          (playerRole.alive || moderatore.playerDying.includes(playerRole))
        ) {
          isVeggenteAlive = true;
          continue;
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
      } else if (isOsteIn) {
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
      } else {
        embed.sendEmbed(
          [149, 193, 255],
          "Non giungono notizie dall'Osteria.",
          message.channel
        );
      }
    }
  },
};
