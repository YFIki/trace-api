import {check} from 'express-validator';
import {getCustomMessage, checkIfHasValue} from './validationHelper';

export default () => {
  /**
   * -- example 
   * ---- 詳細 : https://express-validator.github.io/docs/index.html
   * ---- 全ての利用可能なバリデーター : https://github.com/validatorjs/validator.js#validators
   * 
  isXXXX: checkIfHasValue('XXXX')
   .isAlpha()
   .bail()
   .withMessage(getCustomMessage('isAlpha')
   .isLength({max: 1, min: 20})
   .bail()
   .withMessage(getCustomMessage('isLength', {min: 1, max: 20}))
   .isEmail()
   .bail()
   .withMessage(getCustomMessage('isEmail'))
   .notEmpty()
   .bail()
   .withMessage(getCustomMessage('isRequired'))
   .isNumeric()
   .bail()
   .withMessage(getCustomMessage('isNumeric'))
  */
}
