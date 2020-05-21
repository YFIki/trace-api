/**
 * getToken.tsの単体テスト
 *
 * given: apiキーと組織ID固定値が用意された状態
 * when:  getToken（apiキーと組織ID固定値）実行
 * then:  IFTからonboarding_tokenが含まれるjsonが返却される
 */
import config from 'config';
import getToken from '../../src/api/middlewares/getToken';

describe('getToken.tsの単体テスト', () => {
  it('onboarding_tokenを含むJSONの取得テスト', async () => {
    const object = { onboarding_token: /.+/ };
    expect(await getToken.getToken(config.ift.mmoOrganizationId, config.ift.apikey)).toMatchObject(object);
  }, 20000);
});
