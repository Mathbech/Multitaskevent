const Discord = require('discord.js');

module.exports = async (bot, interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
        let entry = interaction.options.getFocused()
        if (interaction.commandName === 'aide') {
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })))
        }

        if (interaction.commandName === 'set-status') {
            let sortie = ["Listening", "Watching", "Playing", "Streaming", "Competing"]
            await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
        }
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options, bot.db)
    }

    if (interaction.isButton()) {

        if (interaction.customId.startsWith('accept-')) {
            const mentionedUserId = interaction.customId.split('-')[1];
            const user = interaction.customId.split('-')[2];
            const mentionedUser = interaction.guild.members.cache.get(mentionedUserId);
            if (interaction.user.id === mentionedUserId) {
                db = bot.db
                await interaction.deferUpdate();
                let items = ['Oeuf en chocolat', 'Chocolat blanc', 'chocolats noir', 'kinder surprise', 'chocolat ferrero', 'lapin de paques', 'lot de chocolat'];
                let randomitem = items[Math.floor(Math.random() * items.length)];

                let yes = new Discord.EmbedBuilder()
                    .setColor(bot.color)
                    .setTitle("Chasse aux oeufs")
                    .setDescription(`Félicitation, <@${user}> et ${mentionedUser}!! Vous avez trouvé un ${randomitem}`)
                await interaction.editReply({ embeds: [yes] });
                await interaction.editReply({ components: [] });
                db.query(`INSERT INTO paques (userid, item) VALUES (${mentionedUserId}, '${randomitem}')`)
                db.query(`INSERT INTO paques (userid, item) VALUES (${user}, '${randomitem}')`)

            } else {
                await interaction.reply({content: `Désolé, vous n'êtes pas autorisé à interagir avec ce bouton.`, ephemeral: true});
            }
        }

        if (interaction.customId.startsWith('denny-')) {
            const mentionedUserId = interaction.customId.split('-')[1];
            const mentionedUser = interaction.guild.members.cache.get(mentionedUserId);
            if (interaction.user.id === mentionedUserId) {
                await interaction.deferUpdate();
                const user = interaction.user.id;
                let no = new Discord.EmbedBuilder()
                    .setColor(bot.color)
                    .setTitle("Chasse aux oeufs")
                    .setDescription(`Dommage, ${mentionedUser} as refusé votre invitation a chasser`)
                await interaction.editReply({ embeds: [no] });
                await interaction.editReply({ components: [] });
            } else {
                await interaction.reply({content: `Désolé, vous n'êtes pas autorisé à interagir avec ce bouton.`, ephemeral: true});
            }
        }
    }
}
