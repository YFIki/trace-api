import {check} from 'express-validator';

export { getCustomMessage, checkIfHasValue }

/**
 * 指定されたmessageKeyに合致するメッセージを返します
 * @param {string} messageKey メッセージキー
 * @param {Object<string, string>} [messageParams = {}] 使用するメッセージテンプレートの埋め込み変数をキーとするObject
 * @returns メッセージ
 */
const getCustomMessage = (messageKey, messageParams: {min?:number, max?:number, gt?:number, lt?:number, len?:number} = {}) => {
  return function(value, meta) {
    const messages = {
      isRequired: '必須項目です。',
      isString: '文字で入力してください。',
      isNumeric: '数字で入力してください。',
      isAlpha: '半角英字で入力してください。',
      isInt: '数値を入力してください。',
      isIntMin: `${messageParams.min}以上の数値を入力してください。`,
      isIntMax: `${messageParams.max}以下の数値を入力してください。`,
      isIntBetween: `${
        'min' in messageParams
          ? messageParams.min + '以上'
          : 'gt' in messageParams
          ? messageParams.gt + '超'
          : ''
      }、${
        'max' in messageParams
          ? messageParams.max + '以下'
          : 'lt' in messageParams
          ? messageParams.lt + '未満'
          : ''
      }の数値を入力してください。`,
      isIntGT: `${messageParams.gt}より大きい数値を入力してください。`,
      isIntLT: `${messageParams.lt}未満の数値を入力してください。`,
      isLength: `${messageParams.min}〜${messageParams.max}文字以内で入力してください。`,
      isMaxLength: `${messageParams.len}文字以内で入力してください。`,
      isJustLength: `${messageParams.len}文字で入力してください。`,
      isEmail: '正しい形式のメールアドレスを入力して下さい。',
      isDate: '正しい日付ではありません。',
      isCode: '項目を選択しなおして下さい。',
      isFullWidth: '全角で入力してください。',
      isArrayLength: `${messageParams.min}〜${messageParams.max}個以内で選択してください。`
    };
    return messages[messageKey];
  };
}

/**
 * チェック対象のフィールドに値がある場合、チェックを実行します
 * 値がある: value != null && value !== undefined && value !== '' && value !== ' ' && value !== '　'
 * @param {string} fields チェック対象のフィールド識別子
 */
const checkIfHasValue = (fields) => {
  return module.exports.checkIf(fields, value => {
    if (Array.isArray(value)) {
      return value.some(v => hasValue(v));
    }
    return hasValue(value);
  });
}

const hasValue = val =>
  val != null && val !== '' && val !== ' ' && val !== '　';
