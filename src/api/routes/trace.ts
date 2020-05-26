import { Router, Request, Response, NextFunction } from 'express';
import { getTraceList } from '../../services/traceService';
import { getTraceConsumer } from '../../services/traceEpcIdService';
import { getPicture } from '../../services/pictureService';
import session from 'express-session';
import { toCamelForObj } from '../middlewares/converter';

const router = Router();

/**
 * @swagger
 * '/api/v1/trace':
 *  get:
 *   tags:
 *     - trace
 *   summary: '？？？'
 *   description: '？？？？？'
 *   responses:
 *     200:
 *       description: '正常終了'
 *       content:
 *         application/json:
 *           schema:
 *            properties:
 *             events:
 *               description: 'イベント一覧'
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   datetime:
 *                     description: 'yyyy/mm/dd HH:MM'
 *                     type: string
 *                   facility:
 *                     description: '<IFT取得施設データ> 　or  <変換用語>'
 *                     type: string
 *                   bizLocation:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         description: 'float'
 *                         type: number
 *                       longitude:
 *                         description: 'float'
 *                         type: number
 *                   stateId:
 *                     description: '<ID>'
 *                     type: string
 *                   bizStep:
 *                     description: '<変換用語>'
 *                     type: string
 *                   disposition:
 *                     description: '<変換用語>'
 *                     type: string
 *             payload:
 *               description: 'イベント一覧'
 *               type: object
 *               properties:
 *                 coordinate:
 *                   description: 'float'
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       description: 'float'
 *                       type: number
 *                     longitude:
 *                       description: 'float'
 *                       type: number
 *                 casting_net_time:
 *                   description: 'yyyy/mm/dd HH:MM'
 *                   type: string
 *                 lifting_net_time:
 *                   description: 'yyyy/mm/dd HH:MM'
 *                   type: string
 * '/api/v1/trace/{epcId}':
 *  get:
 *   tags:
 *     - trace
 *   summary: 'IFTからepcIdに合致するロット、シリアル、またはパレットの消費者トレースを取得し、整形して返却する'
 *   description: 'epcIdに合致する食品のトレース情報をIFTのTrace API（/epcs/{epc_id}/trace/consumer）から取得し、日付の降順にソートして返却する。'
 *   parameters:
 *   - in: path
 *     name: epcId
 *     required: true
 *     description: トレースするロット、シリアル、またはパレットのEPC
 *     schema:
 *       type: string
 *   responses:
 *     200:
 *       description: '正常終了'
 *       content:
 *         application/json:
 *           schema:
 *            properties:
 *              events:
 *                description: ''
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    datetime: 
 *                      description: '日時'
 *                      format: 'YYYY/MM/DD HH:mm'
 *                      type: string
 *                    facility:
 *                      description: '施設名'
 *                      type: string
 *                    bizLocation:
 *                      type: object
 *                      properties:
 *                        latitude:
 *                          description: '緯度'
 *                          type: number
 *                        longitude:
 *                          description: '経度'
 *                          type: number
 *                    stateId:
 *                      description: '変換ID'
 *                      type: number
 *                    bizStep:
 *                      description: '業務ステップ'
 *                      type: string
 *                    disposition:
 *                      description: ''
 *                      type: string
 *                    comment:
 *                      description: 'このイベントに対するコメント'
 *                      type: string
 *                    dishName:
 *                      description: '料理名'
 *                      type: string
 *                    picture:
 *                      description: '画像バイナリ'
 *                      type: string
 *              payloads:
 *                description: ''
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    coordinate:
 *                      type: object
 *                      properties:
 *                        latitude:
 *                          description: '緯度'
 *                          type: number
 *                        longitude:
 *                          description: '経度'
 *                          type: number
 *                    castingNetTime:
 *                       description: ''
 *                       format: 'YYYY-MM-DDTHH:mm:ssZ'
 *                       type: string
 *                    castingNetTimeZoneOffset:
 *                       description: ''
 *                       type: string
 *                    liftingNetTime:
 *                       description: ''
 *                       format: 'YYYY-MM-DDTHH:mm:ssZ'
 *                       type: string
 *                    liftingNetTimeZoneOffset:
 *                       description: ''
 *                       type: string
 *     400:
 *       description: 'Bad Request'
 *     401:
 *       description: 'Unauthorized'
 * '/api/v1/trace/image':
 *  get:
 *   tags:
 *     - trace
 *   summary: 'クエリパラメータで指定された画像パスの画像を取得する'
 *   description: 'クエリパラメータで指定された画像パスの画像をObject Strageから取得し、base64形式で返却する'
 *   parameters:
 *   - in: query
 *     name: imgUrl
 *     description: 画像のURL
 *   responses:
 *     200:
 *       description: '正常終了'
 *       content:
 *         text/plain:
 *           schema:
 *            type: string
 *     400:
 *       description: 'Bad Request'
 */
export default (app: Router) => {
	app.use('/v1/trace', router);

	router.get('/', (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = getTraceList();
			
			res.json(toCamelForObj(result)).status(200);
		} catch (err) {
			// 例外が発生した時の対応がわからないので、一旦console.logに出力するようにします。
			console.log(err);
		}
	});

	router.get('/image', async (req: Request, res: Response, next: NextFunction) => {
		try {
			// クエリパラメータからurlを取得
			const url = req.query.imgUrl.toString();

			// URLから画像を取得し、arraybufferで返却する
			const picture = await getPicture(url);

			res.send(picture);
		} catch (err) {
			console.log(err);
			next(err);
		}
	});

	router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
		// pathパラメータからepcIdを取得
		const epcId = req.params.id;
		
		try {
			// セッションから認証トークンを取得
			const onboardingToken = session.onboardingToken.onboarding_token;
			
			// 取得した認証トークンでIFTにデータを取得しに行く
			const result = await getTraceConsumer(onboardingToken, epcId);
			
			res.json(toCamelForObj(result)).status(200);
		} catch (err) {
			// 発生したエラーをエラーハンドラーに投げる。
			next(err.response);
		}
	});
};
