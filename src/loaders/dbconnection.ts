const Sequelize = require('sequelize');
const config = require('../config/development.json');
var db = config.db;

/**
 * company に対する接続設定を定義
 */
const dbConfig = new Sequelize(db.database, db.username, db.password, {
    // 接続先ホストを指定
    host: db.host,
    port: db.port,

    // 使用する DB 製品を指定
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = dbConfig;
