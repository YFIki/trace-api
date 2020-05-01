/**
 * getToken.tsの単体テスト
 * 
 * given: apiキーと組織ID固定値が用意された状態
 * when:  getToken（apiキーと組織ID固定値）実行
 * then:  IFTからonboarding_tokenが含まれるjsonが返却される
 */
const config = require('config');

describe('getToken.tsの単体テスト', () => {
  it('onboarding_tokenを含むJSONの取得テスト', async () => {
    const logic = require('../../src/api/middlewares/getToken');
    const object = {onboarding_token: /.+/};
    expect(await logic.getToken(config.ift.mmoOrganizationId, config.ift.apikey)).toMatchObject(object);
  });
});