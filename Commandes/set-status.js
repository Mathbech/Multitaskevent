const Discord = require('discord.js');

module.exports = {
    
    name: "set-status",
    description: "Change le status du bot",
    permissions: Discord.PermissionFlagsBits.Administrator,
    dm: true,
    category: 'Owner',
    options:[
        {
            type: 'string',
            name:'activite',
            description: 'Activité du bot',
            required: true,
            autocomplete: true,
        },
        {
            type: 'string',
            name:'status',
            description: 'status du bot',
            required: true,
            autocomplete: false,
        },
        {
            type: 'string',
            name:'lien',
            description: 'Url du stream',
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db){
		let activity = args.getString('activite');
        if(activity !=="Listening" && activity !=="Playing" && activity !=="Watching" && activity !=="Competing" && activity !=="Streaming") return message.reply("Merci de suivre l'autocomplete")

        let status = args.getString('status');

        if(activity === "Streaming" && args.getString("lien") === null) return message.reply("Merci de fournir une URL")
        if (activity === "Streaming" && !args.getString("lien").match(new RegExp(/^(?:https?:\/\/)?(?:www\.|go\.)??twitch\.tv\/([a-z0-9_]+)($|\?)/))) {
            return message.reply({content:"Merci de mettre une url twitch", ephemeral:true})
        }

        if(activity === "Streaming"){
            await bot.user.setActivity(status, { type: Discord.ActivityType[activity], url: args.getString("lien")})
        }else{
            await bot.user.setActivity(status, { type: Discord.ActivityType[activity]})
        }

        await message.reply({content: "Le satus a bien été mis à jour", ephemeral: true})
    }
}