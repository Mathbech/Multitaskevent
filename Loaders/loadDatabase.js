const mysql = require('mysql');

module.exports = async () => {
    let db = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'Votre_ID',
        password: 'Votre_PAssword',
        database: 'Votre Database'
    })

    return db
}