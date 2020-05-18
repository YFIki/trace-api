/**
 * getEventInfoModel.jsの単体テスト
 *
 * given: サーバが起動している、DBが起動している、dbconnectionが正常に動く
 * when:  getAllEventList()を実行したとき
 * then:  eventの付加情報が全て取得される
 *
 * given: サーバが起動している、DBが起動している、dbconnectionが正常に動く
 * when:  getAllEventList()を存在するevent_idで実行したとき
 * then:  eventの付加情報が1件取得される
 *
 * given: サーバが起動している、DBが起動している、dbconnectionが正常に動く
 * when:  getEventList()を、存在しないevent_idで実行したとき
 * then:  nullが返却される
 */
import express from 'express';
import DbConnection from '../../src/loaders/dbconnection';
import { getAllEventList, getEvent } from '../../src/models/eventInfoModel';
import httpContext from 'express-http-context';

const app = express();

describe('getEventInfoModel.jsの単体テスト', () => {
  it('getAllEventList()のテスト', async () => {
    const result = await getAllEventList();
    expect(result.length).toBeGreaterThan(0);
  });
  it('getEvent()のテスト 存在するeventId', async () => {
    const result = await getEvent('urn:uuid:6d890ce6-73cd-4f7d-a291-cd716496b825');
    expect(result).toMatchObject({
      eventId: expect.anything(),
      comment: expect.anything(),
      dishName: expect.anything(),
      picUrl: expect.anything(),
      registedDate: expect.anything(),
      updatedDate: expect.anything(),
    });
  });
  it('getEvent()のテスト 存在しないeventId', async () => {
    const result = await getEvent('ksksksksksksksksksksksksksksksksksks');
    expect(result).toBeUndefined();
  });
});
