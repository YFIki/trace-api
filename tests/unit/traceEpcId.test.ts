/**
 * traceEpcIdAPI（仮）の単体テスト
 * 
 * given: getToken関数でonbording_tokenが取得できる
 * when:  エンドポイント[/api/v1/trace/{epcId}]にgetで接続
 * then:  mockデータが返ってくる
 */
const request = require('supertest');

describe('traceEpcIdAPI（仮）の単体テスト', () => {
  /**
  it('mock値が返ってくるか確認', async () => {
    const response = await request('http://localhost:4000').get('/api/v1/trace/urn%3Aibm%3Aift%3Aproduct%3Aserial%3Aobj%3A4966479542960.IAeK.1000');
    const resultJson = {
      "events": [
        {
          "datetime": "2020/04/27 22:00",
          "facility": "レストラン",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "68",
          "bizStep": "",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 21:00",
          "facility": "レストラン",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "77",
          "bizStep": "開梱",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 09:00",
          "facility": "レストラン",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "73",
          "bizStep": "保管",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 08:00",
          "facility": "レストラン",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "62",
          "bizStep": "入荷",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 07:00",
          "facility": "海光物産(株)",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "30",
          "bizStep": "出荷",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 06:00",
          "facility": "海光物産(株)",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "34",
          "bizStep": "保管",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 05:00",
          "facility": "海光物産(株)",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "21",
          "bizStep": "梱包",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 04:00",
          "facility": "海光物産(株)",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "7",
          "bizStep": "加工",
          "disposition": "NoDisposition"
        },
        {
          "datetime": "2020/04/27 03:00",
          "facility": "海光物産(株)",
          "bizLocation": {
            "latitude": null,
            "longitude": null
          },
          "stateId": "5",
          "bizStep": "陸揚げ",
          "disposition": "NoDisposition"
        }
      ],
      "payloads": [
        {
          "coordinate": {
            "latitude": 35.197307,
            "longitude": 141.073172
          },
          "castingNetTime": "2020-04-26T16:00:00Z",
          "castingNetTimeZoneOffset": "+09:00",
          "liftingNetTime": "2020-04-26T17:00:00Z",
          "liftingNetTimeZoneOffset": "+09:00"
        }
      ]
    };

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(resultJson);
  });
  */
  it('エラーなく終了し、想定された形式で返却されるか確認', async () => {
    const response = await request('http://localhost:4000').get('/api/v1/trace/urn%3Aibm%3Aift%3Aproduct%3Aserial%3Aobj%3A4966479542960.IAeK.1000');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        events: expect.arrayContaining([
          {
            datetime: expect.anything(),
            facility: expect.anything(),
            bizLocation: {
              latitude: null,
              longitude: null
            },
            stateId: expect.anything(),
            bizStep: expect.anything(),
            disposition: expect.anything(),
            comment: expect.anything(),
            dishName:expect.anything(),
            picture:expect.anything()
          }
        ]),
        payloads:  expect.arrayContaining([
          {
            coordinate: {
              latitude: expect.anything(),
              longitude: expect.anything()
            },
            castingNetTime: expect.anything(),
            castingNetTimeZoneOffset: expect.anything(),
            liftingNetTime: expect.anything(),
            liftingNetTimeZoneOffset: expect.anything(),
            comment: expect.anything(),
            picture:expect.anything()
          }
        ])
      }
    );
  });
});
