/**
 * traceEpcIdAPI（仮）の単体テスト
 * 
 * given: getToken関数でonbording_tokenが取得できる
 * when:  エンドポイント[/api/v1/trace/{epcId}]にgetで接続
 * then:  mockデータが返ってくる
 */
const request = require('supertest');

describe('traceEpcIdAPI（仮）の単体テスト', () => {
  it('mock値が返ってくるか確認', async () => {
    const response = await request('http://localhost:4000').get('/api/v1/trace/xxx');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(require('../../src/services/epcs_{epcs_id}_trace_consumer.json'));
  });
});
