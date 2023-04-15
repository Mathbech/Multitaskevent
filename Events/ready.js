const Discord = require('discord.js');
const loadDatabase = require('../Loaders/loadDatabase');
const loadSlashCommands = require("../Loaders/loadSlashCommands");
const sendMessageInterval = require('./stats');

module.exports = async bot => {
    bot.db = await loadDatabase();
    // console.log(bot.db);

    bot.db.connect(function(err){
        if (err){ 
            console.log(err);
        }else{
            console.log('Database successfully connected');
        }
    });

    await bot.user.setActivity('La chasse aux chocolats de pâques', { type: Discord.ActivityType['Competing']})

    await loadSlashCommands(bot);

    console.log(`${bot.user.tag} is online!`);

    sendMessageInterval(bot);    
}