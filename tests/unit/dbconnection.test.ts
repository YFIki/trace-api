/**
 * db_connector.jsの単体テスト
 */
describe('dbconnector.jsの単体テスト', () => {
    const connector = require('./../../src/loaders/dbconnection');
    describe('接続成功時', () => {
        it('接続テスト', async () => {
            await connector.authenticate();
            expect(connector).toBeDefined(); // Errorなく終了したか
            expect.assertions(1);
        });
        it('切断テスト', async () => {
            await connector.close();
            expect(connector).toBeDefined(); // Errorなく終了したか
            expect.assertions(1);
        });
    });
});
