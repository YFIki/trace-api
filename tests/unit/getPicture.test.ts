/**
 * getPicture.tsの単体テスト
 *
 * given: Object Strageに画像データが入っている状態
 * when:  /trace/image?imgUrl=<画像URL>を実行
 * then:  画像URLの画像がbase64形式で取得される
 */
import request from 'supertest';

describe('getPicture.tsの単体テスト', () => {
  it('test', async () => {
    const response = await request('http://localhost:4000').get('/api/v1/trace/image?imgUrl=trace-bucket%2Fimg_menu.jpg');

    expect(response.status).toBe(200);
    expect(response.text).toEqual(expect.not.objectContaining({errors: expect.anything()}));
  }, 20000);
});
