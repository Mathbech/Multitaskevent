const Discord = require('discord.js');

module.exports = {
    
    name: "inventaire",
    description: "Affiche votre inventaire d'event",
    permissions: "Aucune",
    dm: true,
    category: 'Pâques',

    async run(bot, message, args, db){
        
        db.query(`SELECT COUNT(*) as count, item FROM paques WHERE userid = '${message.user.id}' GROUP BY item HAVING COUNT(*) > 1 UNION SELECT 1 as count, item FROM paques WHERE userid = '${message.user.id}' GROUP BY item HAVING COUNT(*) = 1 `, async (err, req) => {        
        // db.query(`SELECT * FROM paques WHERE userid = '${message.user.id}'`, async (err, req) =>{
            let no = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle('inventaire')
            .setDescription('Votre inventaire est vide 😪')
            .setTimestamp()
            .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true}) });
            
            if(req.length <1) return message.reply({embeds: [no], ephemeral: true})
        
        
            let info = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Inventaire`)
            .setDescription(`Voici votre inventaire: `)        
            .setTimestamp()
            .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true}) })

            // for(let i = 0; i < req.length; i++){

            //     info.addFields( [ { name:`Item n° ${i + 1}`, value:`${req[i].item}` } ] )
            // }
            for (let i = 0; i < req.length; i++) {
                info.addFields([{name: `Trouvaille : ${req[i].item}`, value: `Quantité : ${req[i].count}`}]);
            }
            await message.reply( { embeds: [ info ], ephemeral: true } )
        });



    }
}