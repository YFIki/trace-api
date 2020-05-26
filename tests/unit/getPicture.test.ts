/**
 * getPicture.tsの単体テスト
 *
 * given: apiキーと組織ID固定値が用意された状態
 * when:  getToken（apiキーと組織ID固定値）実行
 * then:  IFTからonboarding_tokenが含まれるjsonが返却される
 */
import config from 'config';
import { getPicture } from '../../src/services/traceEpcIdService';

describe('getPicture.tsの単体テスト', () => {
  it('test', async () => {
    console.log(getPicture('images/img_menu.jpg'));
  }, 20000);
});
