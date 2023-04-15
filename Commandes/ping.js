const Discord = require('discord.js');

module.exports = {
    
    name: "ping",
    description: "Affiche la latence du bot",
    permissions: "Aucune",
    dm: true,
    category: 'Informations',

    async run(bot, message){
        await message.reply(`Ping: \`${bot.ws.ping}\``);
    }
}
