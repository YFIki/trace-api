/**
 * 引数で指定された配列を指定された通りにソートする
 * @param {Array} 対象配列
 * @param {string} ソートするキー
 * @param {string} 並び順（asc/desc）：値が正しくないor指定されていない場合はasc
 * @param {string} 配列に名前がついている場合指定
 */
export const sortArrayObject = (array: Array<object>, key: string, sort?: string, arrayName?: string): Array<any> => {
  const target = array[arrayName] || array;
  target.sort(function(a, b) {
    if (a[key] > b[key]) {
      return sort === 'desc' ? -1 : 1;
    } else {
      return sort === 'desc' ? 1 : -1;
    }
  });

  return array;
}
