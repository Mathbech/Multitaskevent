const Discord = require('discord.js');

module.exports = {

    name: "classement",
    description: "Affiche le classement",
    permissions: Discord.PermissionFlagsBits.Administrator,
    dm: true,
    category: 'Aide',

    async run(bot, message, args, db) {

        db.query(`SELECT userid, COUNT(item) as item_count FROM paques GROUP BY userid ORDER BY item_count DESC;`, async (err, req) => {
            let no = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle('Classement')
                .setDescription('Il n\'y a pas de classement')
                .setTimestamp()
                .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) });

            if (req.length < 1) return message.reply({ embeds: [no], ephemeral: true })


            let info = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Classement`)
                .setDescription(`Voici votre inventaire: `)
                .setTimestamp()
                .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            for(let i = 0; i < req.length; i++){

                info.addFields( [ { name:`N° ${i + 1}: <@${req[i].userid}>`, value:`Nombre d'item: ${req[i].item_count}` } ] )
            }
            await message.reply({ embeds: [info], ephemeral: true })
        });

    }
}