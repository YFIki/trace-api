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
    if (!session.iamToken) {
      session.iamToken = await Token.getIamToken(config.ift.apikey);
    }
    if (!session.onboardingToken || !isValid(session.onboardingToken.onboarding_token)) {
      session.onboardingToken = await Token.exchangeToken(config.ift.mmoOrganizationId, session.iamToken);
    }

    next();
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

  static getIamToken = async (apikey: string): Promise<string> => {
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
      console.log(err); 
    }
  }

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
      console.log(err);
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
