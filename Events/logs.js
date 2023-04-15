const fs = require('fs');
const util = require('util');



const Discord = require('discord.js');

module.exports = async bot => {
    // Créer un flux d'écriture vers un fichier
    const logStream = fs.createWriteStream('./logs/console.log', { flags: 'a' });

    // Rediriger les messages de la console vers le flux d'écriture
    console.log = (message) => {
        const timestamp = new Date().toISOString(); // Ajouter un horodatage
        const logMessage = `${timestamp} : ${message}\n`; // Formater le message de journalisation
        logStream.write(logMessage); // Écrire le message dans le fichier de journalisation
        process.stdout.write(logMessage); // Afficher le message dans la console
    };

    // Configuration des transports de journalisation pour les erreurs
    const errorLogger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: './logs/errors.log', level: 'error' })
        ]
    });

    // Configuration des transports de journalisation pour les informations
    const infoLogger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: './logs/infos.log', level: 'info' })
        ]
    });

    // Configuration des transports de journalisation pour la latence
    const latencyLogger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: './logs/latency.log', level: 'debug' })
        ]
    });

    // Création d'un transport pour enregistrer la console dans un fichier de journalisation
    const consoleTransport = new winston.transports.Console({
        format: winston.format.simple()
    });
    consoleTransport.stream = {
        write: function (message, encoding) {
            infoLogger.info(message.trim());
        }
    };

    // Ajout du transport pour enregistrer la console dans le fichier de journalisation des informations
    infoLogger.add(consoleTransport);

    // Fonction pour enregistrer les erreurs
    function logError(error) {
        errorLogger.error(error);
    }

    // Fonction pour enregistrer les informations
    function logInfo(info) {
        infoLogger.info(info);
    }

    // Fonction pour enregistrer la latence
    function logLatency(latency) {
        latencyLogger.debug(`Latency: ${latency}ms`);
    }

    // Utilisation des fonctions de journalisation dans votre code Discord.js
    bot.on('error', logError);
    bot.on('warn', logInfo);
    bot.on('debug', logLatency);

    // Enregistrement de la latence toutes les heures
    setInterval(function () {
        const latency = bot.ws.ping;
        latencyLogger.debug(`Latency: ${latency}ms`);
    }, 3600000); // 3600000 ms = 1 heure
}