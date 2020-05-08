import { Router, Request, Response, NextFunction } from 'express';
import { getTraceList } from '../../services/traceService';
import { getToken } from '../middlewares/getToken';
import { getTraceConsumer } from '../../services/traceEpcIdService';
import config from 'config';

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
 *             trace_list:
 *               description: '？？？'
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   datetime:
 *                     description: '？？？'
 *                     type: date
 *                   facility:
 *                     description: '？？？'
 *                     type: string
 *                   stateId:
 *                     description: '？？？'
 *                     type: number
 *                   bizStep:
 *                     description: '？？？'
 *                     type: string
 *                   disposition:
 *                     description: '？？？'
 *                     type: string
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
			
			return res.json({trace_list: result}).status(200);
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
			
			return res.json(result).status(200);
		} catch (err) {
			// 例外が発生した時の対応がわからないので、一旦console.logに出力するようにします。
			console.log(err);
		}
	});
};
