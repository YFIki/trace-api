import { Router, Request, Response, NextFunction } from 'express';
import { getSample } from '../../services/sampleService';
import httpContext from 'express-http-context';
import dbconnection from '../../loaders/dbconnection';
import logger from '../../loaders/logger';

const router = Router();

/**
 * @swagger
 * '/api/v1/sample':
 *  get:
 *   summary: 'サンプルAPI'
 *   description: 'APIのサンプル。JSONを返却する。'
 *   responses:
 *     200:
 *       description: '正常終了'
 *       content:
 *         application/json:
 *           schema:
 *            properties:
 *             sample:
 *               description: 'サンプル'
 *               type: string
 *               example: sample data.
 */
export default (app: Router) => {
	app.use('/v1/sample', router);

	router.get('/', async (req: Request, res: Response, next: NextFunction) => {
		const sequelize = dbconnection.httpContextInstance;

		try {
			// トランザクションの開始
			await sequelize.beginTransaction();

			// サービスの処理
			const result = await getSample();
		
			// 処理が正常に終わった場合、コミットし、取得したデータを返却する
			await sequelize.commit();
			
			return res.json({sample: result}).status(200);
		} catch (err) {
			try {
			// DBトランザクションをロールバック
			await sequelize.rollback();
			} catch (rollbackErr) {
				logger.error(rollbackErr);
			}
			next(err);
		}
	});
};
