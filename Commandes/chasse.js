const Discord = require('discord.js');

module.exports = {

    name: "chasse",
    description: "Vous emène à la chasse aux oeuf",
    permissions: "Aucune",
    dm: true,
    category: 'Paques',
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "Avec qui voulez-vous chassser?",
            required: false,
        },
    ],

    async run(bot, message, args) {
        let user = args.getUser('utilisateur');
        let author = message.user.id;

        if (!user) {
            await message.reply({ content: 'Merci de choisir un partenaire de chasse!', ephemeral: true });
        } else {
            if (author !== user.id ) {
                let embed = new Discord.EmbedBuilder()
                    .setColor(bot.color)
                    .setTitle('Chasse aux oeuf')
                    .setDescription(`${user} Voulez-vous aller chasser avec ${message.user}`)
    
                const accept = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
                    .setCustomId("accept")
                    .setLabel("Accepter la chasse")
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji("✅")
                    .setCustomId(`accept-${user.id}-${author}`)
                )
    
                const denny = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
                    .setCustomId("denny")
                    .setLabel("Refuser la chasse")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji("❌")
                    .setCustomId(`denny-${user.id}`)
                )
    
                //await message.channel.send(`${user}`)
                await message.reply({ content: `${user}`, embeds: [embed], components: [accept, denny] })
            } else {
                await message.reply({ content: 'Vous ne pouvez pas chassser avec vous-même', ephemeral: true });
            }
        }
    }
}
