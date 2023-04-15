const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
const config = require('./config.js');
const winston = require('winston');
const fs = require('fs');


bot.commands = new Discord.Collection()
bot.color = "DarkGreen";
bot.version = "0.0.1";


bot.login(config.token)

loadEvents(bot)
loadCommands(bot)