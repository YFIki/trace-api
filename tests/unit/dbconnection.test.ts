/**
 * db_connector.jsの単体テスト
 */

import dbconnection from '../../src/loaders/dbconnection';

describe('dbconnector.jsの単体テスト', () => {
    describe('接続成功時', () => {
        it('接続テスト', async () => {
            console.log(dbconnection)
            await dbconnection.authenticate();
            expect(dbconnection).toBeDefined(); // Errorなく終了したか
            expect.assertions(1);
        });
        it('切断テスト', async () => {
            await dbconnection.close();
            expect(dbconnection).toBeDefined(); // Errorなく終了したか
            expect.assertions(1);
        });
    });
});
