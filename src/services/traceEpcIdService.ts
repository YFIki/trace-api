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
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${onboardingToken}`
    },
  };
  // NODE_ENVがtestの時はMockを返す
  if (process.env.NODE_ENV === 'test') {
    return require('./epcs_{epcs_id}_trace_consumer.json');
  }
  try {
    const result = await axios.get(
      `https://sandbox.food.ibm.com/ift/api/outbound/v2/epcs/${epcId}/trace/consumer`,
      config);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
