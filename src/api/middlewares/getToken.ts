import axios from 'axios';
import session from 'express-session';
import config from 'config';
import decode from 'jwt-decode';
import moment from 'moment-timezone';

class Token {
  /**
   * ミドルウェアとして、セッションにIAM TokenとOnboardingTokenが入っているか確認する
   * 入っていない場合は取得しに行く
   * OnboardingTokenの有効期限が切れている場合も取得しに行く
   */
  static middleware = async (req, res, next) => {
    try {
      if (!session.iamToken || !isValid(session.iamToken.access_token)) {
        session.iamToken = await Token.getIamToken(config.ift);
      }
      if (!session.onboardingToken || !isValid(session.onboardingToken.onboarding_token)) {
        session.onboardingToken = await Token.exchangeToken(config.ift.mmoOrganizationId, session.iamToken);
      }
      next();
    } catch (err) {
      next(err.response);
    }
  }

  /**
   * IFTから認証トークン（onboarding_token）を取得して返却する
   * @param mmoOrganizationId 
   * @param apikey 
   * @return {object} json
   */
  static getToken = async (
    mmoOrganizationId: string,
    apikey: string
  ): Promise<{onboarding_token: string}> => {
    const iamTokenData = await Token.getIamToken(apikey);
    return await Token.exchangeToken(mmoOrganizationId, iamTokenData);
  };

  /**
   * 引数で指定されたAPIキーを使用し、IAMトークンを取得する
   * - API を使用した IBM Cloud IAM アクセス・トークンのリフレッシュと新しいリフレッシュ・トークンの取得
   * https://www.ibm.com/support/knowledgecenter/ja/bluemix_stage/containers/cs_cli_install.html
   * @param {String} apikey
   * @param {String} [refreshToken]
   * @param {string} [accountId]
   * @return {object} { "access_token": "<iam_token>", "refresh_token": "<iam_refresh_token>", "token_type": "Bearer", "expires_in": 3600, "expiration": 1493747503}
   */
  static getIamToken = async (apikey: string): Promise<{access_token, refresh_token}> => {
    const data: string = 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=' + apikey;
    const config: object = {
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    try {
      const result = await axios.post('https://iam.cloud.ibm.com/identity/token', data, config);
      return result.data;
    } catch (err) {
      throw err; 
    }
  }

  /**
   * 引数で指定された値を用いて、Onboardingトークンを取得する
   * @param {String} mmoOrganizationId 企業ID
   * @param {object} iamTokenData IAMトークン
   * @return {object} onboardingトークン
   */
  static exchangeToken = async (
    mmoOrganizationId: string,
    iamTokenData: any
  ): Promise<any> => {
    const data = {
      access_token: iamTokenData.access_token,
      refresh_token: iamTokenData.refresh_token,
      token_type: iamTokenData.token_type,
      expires_in: iamTokenData.expires_in,
      expiration: iamTokenData.expiration,
      scope: iamTokenData.scope,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const result = await axios.post(
        `https://sandbox.food.ibm.com/ift/api/identity-proxy/exchange_token/v1/organization/${mmoOrganizationId}`,
        data,
        config);
      return result.data;
    } catch (err) {
      throw err; 
    }
  }
}

/**
 * JWTをデコードして、expが現在日時より前かを判別する
 * @param {string} JWTトークン
 * @return {boolean} true/false
 */
const isValid = (jwt: string): boolean => {
  const decodeToken = decode(jwt);
  return !!(decodeToken.exp >= moment().tz('Asia/Tokyo').unix());
}


export default Token;
export { isValid }
