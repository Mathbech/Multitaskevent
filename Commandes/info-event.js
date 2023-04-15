const Discord = require('discord.js');

module.exports = {
    
    name: "info-event",
    description: "Affiche des informations sur le bot",
    permissions: "Aucune",
    dm: true,
    category: 'Aide',

    async run(bot, message){
		let info = new Discord.EmbedBuilder()
		.setColor(bot.color)
		.setTitle(`Informations sur l'event:`)
		// .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
		.setDescription(`Voici quelques informations sur l'event en cours: \n L'évenment de pâques est arrivé sur le serveur support de multitask! \n Le membre qui récoltera le plus d'item aura le droit a une pub sur le serveur dans <#923508224991326228> \n Voici quelques commandes utiles pour l'évènement:`)
		.addFields(
            {name: '`/chasse`', value: 'Vous permet de chasser les oeufs avec un partenaire!', inline: false},
			{name: '`/inventaire`', value: 'Vous donne votre inventaire', inline: false}
		)
		
		.setTimestamp()
		.setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true}) });
		

		await message.reply( { embeds: [ info ] } )
    }
}