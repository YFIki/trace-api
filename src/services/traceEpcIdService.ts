import axios from 'axios';

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
      'Authorization': `Bearer ${onboardingToken}`
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
        array.push(payload);
      }
      return array;
    }, []);

    // 取得されたeventsに上記で取得したpayloadsを追加したJSONを返却する
    return {events: result.events, payloads: payloads};
  } catch (err) {
    console.log(err);
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
