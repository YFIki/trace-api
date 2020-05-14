import dbconnection from './dbconnection';
import { strictEqual } from 'assert';

const SELECT_TRACE_WORD_CONVERTION = `
  SELECT
    conversion_id AS "conversionId",
    biz_step AS "bizStep",
    disposition AS "disposition",
    industry_id AS "industryId",
    facility_id AS "facilityId",
    view_bs_name AS "viewBsName",
    view_dp_name AS "viewDpName",
    registed_date AS "registedDate",
    updated_date AS "updatedDate"
  FROM
    trace_word_convertion
  ORDER BY conversion_id ASC`;
const SELECT_FACILITY_WORD_LIST = `
  SELECT
    facility_id AS "facilityId",
    location_id AS "locationId",
    view_bs_name AS "viewBsName",
    registed_date AS "registedDate",
    updated_date AS "updateDate"
  FROM
    facility_word_list
  ORDER BY facility_id ASC`;

const singleton = Symbol('instance identifier');
const singletonEnforcer = Symbol('force construct once');

/**
 * 用語変換のキャッシュを保持するクラス
 */
class TraceWords {
  traceWordsConvertion;
  facilityWordList;
  singleton;

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    (async() => {
      let sequel = new dbconnection();
      const traceWordsConvertion = await sequel.select(SELECT_TRACE_WORD_CONVERTION);
      const facilityWordList = await sequel.select(SELECT_FACILITY_WORD_LIST);
      await sequel.sequelize.close();
      sequel = null;
      this.traceWordsConvertion = Object.freeze(traceWordsConvertion);
      this.facilityWordList = Object.freeze(facilityWordList);
    })();
  }

  /**
   * 用語変換のキャッシュを保有するオブジェクトのインスタンスを返す
   */
  static get cache() {
    if (!this[singleton]) {
      this[singleton] = new TraceWords(singletonEnforcer);
    }
    return this[singleton];
  }

  /**
   * 取得済みのtrace_word_convertionテーブルのレコードを全て返す
   * @return {Array} 
   */
  getTraceWordConvertionList() {
    return this.traceWordsConvertion;
  }

  /**
   * 引数で指定されたobjectの値に一致するtraceWordConvertionのレコードを返す
   * @param {Object} searchWord
   * @param {string} searchWord.bizStep
   * @param {string} searchWord.disposition
   * @return {Object} 該当するレコード
   */
  getTraceWordConvertion(searchWord: {bizStep?: string, disposition?: string, facilityId?: string} = {}) {
    return this.traceWordsConvertion.find(x => {
      if ('bizStep' in searchWord) {
        if (x.bizStep !== searchWord.bizStep) {
          return null;
        }
      }
      if ('disposition' in searchWord) {
        if (x.disposition !== searchWord.disposition) {
          return null;
        }
      }
      if ('facilityId' in searchWord) {
        if (x.facilityId !== searchWord.facilityId) {
          return null;
        }
      }

      return x;
    });
  }

  /**
   * 取得済みのfacility_word_listテーブルのレコードを全て返す
   * @return {Array}
   */
  getFacilityWordList() {
    return this.facilityWordList;
  }

  /**
   * 引数で指定されたobjectの値に一致するtraceWordConvertionのレコードを返す
   * @param {Object} searchWord
   * @param {string} searchWord.facilityId
   * @param {string} searchWord.locationId
   * @return {Object} 該当するレコード
   */
  getFacilityWord(searchWord: {facilityId?: string, locationId?: string} = {}) {
    return this.facilityWordList.find(x => {
      if ('facilityId' in searchWord) {
        if (x.facilityId !== searchWord.facilityId) {
          return null;
        }
      }
      if ('locationId' in searchWord) {
        if (x.locationId !== searchWord.locationId) {
          return null;
        }
      }

      return x;
    });
  }
}

export default TraceWords;
