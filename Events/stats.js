const Discord = require('discord.js');


module.exports = async bot => {
    const sendMessage = () => {
        let channelId = 'Your_ChannelID';
        let channel = bot.channels.cache.get(channelId);
        if (channel) {
            bot.db.query(`SELECT userid, COUNT(item) as item_count FROM Your_Database GROUP BY userid ORDER BY item_count DESC;`, async (err, req) => {
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
                    .setDescription(`Voici le classement de l'evènement: `)
                    .setTimestamp()
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

                for (let i = 0; i < req.length; i++) {
                    info.addFields([{ name: `Membre n° ${i + 1}: \t <@${req[i].userid}>`, value: `Nombre d'item: ${req[i].item_count}` }])
                }
                channel.send({ embeds: [info] });
            });

        } else {
            console.log(`Le salon d'ID ${channelId} n'a pas été trouvé.`);
        }
    };

    sendMessage();
    // Envoie le message toutes les heures
    setInterval(sendMessage, 60 * 60 * 1000);


}