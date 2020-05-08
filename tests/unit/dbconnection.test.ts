/**
 * db_connector.jsの単体テスト
 */
import express from 'express';
import DbConnection from '../../src/loaders/dbconnection';
const app = express();

describe('dbconnector.jsの単体テスト', () => {
    describe('接続成功時', () => {
        it('接続テスト', async () => {
            app.use(DbConnection.middleware);
            expect(DbConnection).toBeDefined(); // Errorなく終了したか
            expect.assertions(1);
        });
        it('切断テスト', async () => {
            const dbconnection = await new DbConnection();
            await dbconnection.close();
            expect(DbConnection).toBeDefined(); // Errorなく終了したか
            expect.assertions(1);
        });
    });
});
