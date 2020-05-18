/**
 * db_connector.jsの単体テスト
 *
 * given: DBが起動している
 * when:  DBに接続しに行ったとき
 * then:  sequelizeのインスタンスが返却される
 */
import express from 'express';
import DbConnection from '../../src/loaders/dbconnection';
import request from 'supertest';
const app = express();

describe('dbconnector.jsの単体テスト', () => {
  describe('接続成功時', () => {
    it('接続テスト', async () => {
      app.use(DbConnection.middleware);
      expect(DbConnection).toBeDefined(); // Errorなく終了したか
      expect.assertions(1);
    });
    it('sampleModelで値が取得できるか（START TRANSACTION-SELECT-COMMIT）のテスト', async () => {
      const response = await request('http://localhost:4000').get('/api/v1/sample');
      // console.log(response.body);
      expect(response.body).toMatchObject({});
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
