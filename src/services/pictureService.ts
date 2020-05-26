import session from 'express-session';
import axios from 'axios';
import getToken from '../api/middlewares/getToken';
import { isValid } from '../api/middlewares/getToken';

/**
 * 引数で指定されたURLの画像をObject strageから取得する
 * @param {String} picUrl
 * @return {Binary} 画像データ
 */
export const getPicture = async (picUrl: string): Promise<any> => {  
  try {
    // IAM Token取得
    const apiKey = 'dX1J7z8yfFJgjQku10ahuFT7AwvduU9SfeXO_sby2tff';

    if (!session.osAccessToken || !isValid(session.osAccessToken)) {
      session.osAccessToken = (await getToken.getIamToken(apiKey)).access_token;
    }
    
    const accessToken = session.osAccessToken;

    // Object Strageからデータを取得
    // APIからはBlob形式で返ってくるが、Nodeでは対応していないためarraybufferで受け取る
    const result = await axios.get(
      `https://s3.jp-tok.cloud-object-storage.appdomain.cloud/${picUrl}?responseType=blob`,
      { headers: {'Authorization': `Bearer ${accessToken}`}, responseType: 'arraybuffer' }
    );

    // base64形式で返却
    return Buffer.from(result.data).toString('base64');
  } catch (err) {
    throw err;
  }
}
