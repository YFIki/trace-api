export { toCamelCase, toCamelForObj };
export { Converter as default };

/**
 * 引数で指定された文字列をキャメルケースに変換する
 * @param {string} str 変換対象文字列
 * @return {string} 変換後文字列
 */
const toCamelCase = (str: string): string => {
  // コンスタントケース、スネークケース、ケバブケースを変換
  if (str.indexOf('-') !== 0 || str.indexOf('_') !== 0) {
    str = str.toLowerCase();
    return str.split(/-|_/).map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }

  // 上記以外は全てパスカルケースまたはキャメルケースと想定
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * 引数で指定されたオブジェクトのJSON要素名をキャメルケースに変換する
 * @param {object} obj 変換対象オブジェクト
 * @return {object} 変換後オブジェクト
 */
const toCamelForObj = (obj: {}): {} => {
  const convertedObj = {};
  Object.keys(obj).map((key) => {
    return Object.assign(convertedObj, { [toCamelCase(key)]: 
      Object.prototype.toString.call(obj[key]) === '[object Object]' ? toCamelForObj(obj[key])
      : Array.isArray(obj[key]) ? toCamelForArray(obj[key]) : obj[key]});
  });

  return convertedObj;
}

/**
 * 引数で指定された配列のJSON要素名をキャメルケースに変換する
 * @param {Array} array 変換対象配列
 * @return {Array} 変換後配列
 */
const toCamelForArray = (arr: Array<any>): Array<any> => {
  return arr.map((idx) => {
    // object配列の場合、toCamelForObj関数でkeyをキャメルケースにする。それ以外の場合はプレーンテキストなのでそのままにする
    return Object.prototype.toString.call(idx) === '[object Object]' ? toCamelForObj(idx) : idx;
  });
}

const Converter = {
  toCamelCase: toCamelCase,
  toCamelForObj: toCamelForObj
}
