import axios from 'axios';

/**
 * IFTから認証トークン（onboarding_token）を取得して返却する
 * @param mmoOrganizationId
 * @param apikey
 * @return {object} json
 */
export const getToken = async (mmoOrganizationId: string, apikey: string): Promise<{ onboarding_token: string }> => {
  const iamTokenData = await getIamToken(apikey);
  return await exchangeToken(mmoOrganizationId, iamTokenData);
};

const getIamToken = async (apikey: string): Promise<string> => {
  const data: string = 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=' + apikey;
  const config: object = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const result = await axios.post('https://iam.cloud.ibm.com/identity/token', data, config);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const exchangeToken = async (mmoOrganizationId: string, iamTokenData: any): Promise<any> => {
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
      config,
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
