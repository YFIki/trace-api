import {check} from 'express-validator';
import {getCustomMessage, checkIfHasValue} from './validationHelper';

/**
 * -- example 
 * ---- 詳細 : https://express-validator.github.io/docs/index.html
 * ---- 全ての利用可能なバリデーター : https://github.com/validatorjs/validator.js#validators
 */
export default {
  isSampleRequired: check('sample')
    .notEmpty()
    .bail()
    .withMessage(getCustomMessage('isRequired'))
    .isBoolean()
    .bail()
    .withMessage(getCustomMessage('isRequired'))
}
