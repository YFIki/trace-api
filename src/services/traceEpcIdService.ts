import axios from 'axios';
import traceWordsResource from '../loaders/traceWordsResource';
import moment from 'moment-timezone';
import { sortArrayObject }  from '../api/middlewares/sort';
import { getAllEventList } from '../models/eventInfoModel';
import fs from 'fs';

/**
 * トレース情報を返却する
 * @param {string} onboardingToken
 * @param {string} epcId
 * @return {object}
 */
export const getTraceConsumer = async (
  onboardingToken: string,
  epcId: string
): Promise<object> => {
  const config: object = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${onboardingToken}`,
      'X-ApiCache-Bypass': true
    },
  };

  try {
    let result;
    // NODE_ENVがtestの時はMockを返す
    if (process.env.NODE_ENV === 'test') {
      result = require('./epcs_{epcs_id}_trace_consumer_payloadin.json');
    } else {
      result = await axios.get(
        `https://sandbox.food.ibm.com/ift/api/outbound/v2/epcs/${epcId}/trace/consumer`,
        config);
      result = result.data;
    }

    // eventsの値を用語変換し、再作成
    const eventInfoList = await getAllEventList();
    
    // 取得されたデータから、payloadのkeyがtargetsで指定されている値を含むものを取得し、配列に追加する。
    const targets = [
      "coordinate",
      "liftingNetTime",
      "liftingNetTimeZoneOffset",
      "castingNetTime",
      "castingNetTimeZoneOffset"
    ];
    const payloads: Array<object> = result.payloads.reduce((array, obj) => {
      const payload = (new Function("return " + obj.payload))();
      if (inculudes(Object.keys(payload), targets)) {
        const eventInfo = eventInfoList.find(x => x.eventId === obj.id);
        const addInfo = {
          "comment": eventInfo? eventInfo.comment : '',
          "picture": eventInfo ? getPicture(eventInfo.picUrl) : ''
        };
        array.push(Object.assign(payload, addInfo));
      }
      return array;
    }, []);
    
    moment.tz.setDefault("Asia/Tokyo");

    const events: Array<object> = result.events.reduce((array, obj) => {
      // 対応する用語変換レコードの取得
      // 'urn:epcglobal:cbv:bizstep:{hoge}' の {hoge} を取得
      const bizStep = obj.biz_step.split(':').pop();
      const facility = traceWordsResource.cache.getFacilityWord({locationId: obj.biz_location_id});
      const traceWord = traceWordsResource.cache.getTraceWordConvertion({bizStep: bizStep, facilityId: facility.facilityId});
      const eventInfo = eventInfoList.find(x => x.eventId === obj.id);

      // traceWordが取得できなかった場合はイベントを配列に追加しない
      if (!traceWord) {
        return array;
      }

      // picUrlは後ほど
      const event = {
        "datetime": moment(obj.event_time).format('YYYY/MM/DD HH:mm'),
        "facility": facility.viewFacilityName,
        "bizLocation": { "latitude": null, "longitude": null },
        "stateId": traceWord.conversionId.trim(),
        "bizStep": traceWord.viewBsName,
        "disposition": traceWord.disposition,
        "comment": eventInfo ? eventInfo.comment : '',
        "dishName": eventInfo ? eventInfo.dishName : '',
        "picture": eventInfo ? getPicture(eventInfo.picUrl) : ''
      }
      array.push(event);

      return array;
    }, []);
  
    // 取得されたeventsに上記で取得したpayloadsを追加したJSONを返却する
    return {events: sortArrayObject(events, 'dateTime', 'desc'), payloads: payloads};
  } catch (err) {
    throw err;
  }
}

/**
 * 引数で指定された配列（array）内に指定された値が含まれているか確認する
 * @param {Array} array targetsが含まれているか確認する配列
 * @param {Array} targets 検索対象の値
 * @return {boolean} true: 全ての値が含まれている / false: 1つでも含まれていない値がある
 */
const inculudes = (array: Array<string>, targets: Array<string>): boolean => {
  let result = true;

  for (const target of targets) {
    result = array.includes(target);
    
    if (result === false) {
      return result;
    }
  }

  return result;
}

/**
 * 引数で指定されたURLの画像をObject strageから取得する
 * @param {String} picUrl
 * @return {Binary} 画像データ
 */
export const getPicture = (picUrl: string): any => {
  const buf = fs.readFileSync(picUrl);

  return buf.toString('base64');
}
