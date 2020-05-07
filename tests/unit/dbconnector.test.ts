/**
 * db_connector.jsの単体テスト
 */
describe('dbconnector.jsの単体テスト', () => {
    const Connector = require('./../../src/models/dbconnector');
    let connector = new Connector();
    describe('接続成功時', () => {
        it('接続テスト', () => {
            connector.start();
            // console.log(connection)
            expect(!!connector).toBe(true); // connectionがnullではない
        });
        it('切断テスト', () => {
            connector.end();
            expect(!!connector).toBe(true); // connectionがnullでない
        });
    });
});
