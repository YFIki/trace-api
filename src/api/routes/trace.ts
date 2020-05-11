import { Router, Request, Response, NextFunction } from 'express';
import { getTraceList } from '../../services/traceService';
import { getToken } from '../middlewares/getToken';
import { getTraceConsumer } from '../../services/traceEpcIdService';
import config from 'config';
import { toCamelForObj } from '../middlewares/converter';

const router = Router();

/**
 * @swagger
 * '/api/v1/trace':
 *  get:
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
 *                     type: date
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
 *                   type: date
 *                 lifting_net_time:
 *                   description: 'yyyy/mm/dd HH:MM'
 *                   type: date
 * '/api/v1/trace/{epcId}':
 *  get:
 *   summary: '？？？'
 *   description: 'IFTからトレース情報jsonを取得する'
 *   parameters:
 *   - in: path
 *     name: epcId
 *     required: true
 *     description: ？？？
 *     schema:
 *       type: string
 *   responses:
 *     200:
 *       description: '正常終了'
 *       content:
 *         application/json:
 *           schema:
 *            properties:
 *             trace_list:
 *               description: '？？？'
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *     401:
 *       description: 'Unauthorized'
 */
export default (app: Router) => {
	app.use('/v1/trace', router);

	router.get('/', (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = getTraceList();
			
			return res.json(toCamelForObj(result)).status(200);
		} catch (err) {
			// 例外が発生した時の対応がわからないので、一旦console.logに出力するようにします。
			console.log(err);
		}
	});

	router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
		// pathパラメータからepcIdを取得
		const epcId = req.params.id;
		try {
			// IFTから認証トークンを取得
			const tokens = await getToken(config.ift.mmoOrganizationId, config.ift.apikey); 
			const onboardingToken = tokens.onboarding_token;
			// 取得した認証トークンでIFTにデータを取得しに行く
			const result = await getTraceConsumer(onboardingToken, epcId);
			
			return res.json(toCamelForObj(result)).status(200);
		} catch (err) {
			// 例外が発生した時の対応がわからないので、一旦console.logに出力するようにします。
			console.log(err);
		}
	});
};
