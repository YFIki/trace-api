export default {
  /**
   * 「項目に依存するエラー」のレスポンス仕様に沿ったオブジェクトを作成し返します。
   * @param {Object} elementMessages キー：項目名、値：メッセージ
   */
  createElementsErrors(elementMessages) {
    const template = {errors: {elements: {}}};
    return Object.keys(elementMessages).reduce((rslt, k) => {
      rslt.errors.elements[k] = elementMessages[k];
      return rslt;
    }, template);
  },
  /**
   * 「項目に依存しないエラー」のレスポンス仕様に沿ったオブジェクトを作成し、返します。
   * @param  {...string} messages エラーメッセージ
   * @returns「項目に依存しないエラー」のレスポンス仕様に沿ったオブジェクト{errors:{messages: messages}}}
   */
  createGenericErrors(...messages) {
    return {errors: {messages}};
  },
  /**
   * validationチェックの結果をレスポンス仕様に沿ったオブジェクト（「項目に依存するエラー」）に変換して返します。
   * @param {Array<ValidationError>} validationErrors express-validator validationResult#array
   * @returns 「項目に依存するエラー」のレスポンス仕様に沿ったオブジェクト{errors: {elements: {elementName: message}}}
   */
  createValidationErrors(validationErrors) {
    const template = {errors: {elements: {}}};
    template.errors.elements = validationErrors.reduce((rslt, item) => {
      return Object.assign(rslt, {[item.param]: item.msg});
    }, {});
    return template;
  }
};
