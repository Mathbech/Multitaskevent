const { token } = require('./config');
const path = require('path');
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager(path.join(__dirname, 'index.js'), {
    token,
    totalShards: 'auto',
    respawn: true
});

manager.on('shardCreate', shard => {
    console.log(`----- SHARD ${shard.id} LAUNCH -----`);
    shard
        .on('death', () => console.log(`----- SHARD ${shard.id} STOPPED -----`))
        .on('ready', () => console.log(`----- SHARD ${shard.id} READY -----`))
        .on('disconnect', () => console.log(`----- SHARD ${shard.id} DISCONNECT -----`))
        .on('reconnecting', () => console.log(`----- SHARD ${shard.id} RECONNECTING -----`));
});


manager.spawn().catch(console.error);
