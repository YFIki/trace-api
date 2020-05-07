/**
 * DBに接続するコネクター
 */
// 注意：importがうまくいかないので、暫定的にrequireで対処
// import config from '../config';
// import config from './../config/development.json';

const { Client } = require('pg');
const config = require('../config/development.json');

let connection = null;

module.exports = class Dbconnector {
    client;
    // DBコネクションの確立
    start = () => {
        try {
            var db = config.db;
            this.client = new Client({
                user: db.username,
                host: db.host,
                database: db.database,
                password: db.password,
                port: db.port,
            });
        } catch (e) {
            console.log('error', 'エラーが発生しました。');
            console.log(e);
            this.client = null;
        } finally {
            return this.client;
        }
    };

    // DBコネクションの終了
    end = () => {
        try {
            this.client.end();
        } catch (e) {
            console.log('error', 'エラーが発生しました。');
            console.log(e);
            this.client = null;
        } finally {
            return this.client;
        }
    };
};

// module.exports = Dbconnector;
