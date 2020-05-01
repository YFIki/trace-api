import { Router, Request, Response, NextFunction } from 'express';
import { getTraceList } from '../../services/traceService';
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
 *               description: 'サンプル'
 *               type: array
 *               items:
 *                 type: objec
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
};
