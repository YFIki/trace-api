import { Router, Request, Response, NextFunction } from 'express';
import { getSample } from '../../services/sampleService';
import httpContext from 'express-http-context';
import dbconnection from '../../loaders/dbconnection';
import logger from '../../loaders/logger';
import {validationResult} from 'express-validator';
import validator from '../middlewares/validators/requestValidator';
import errorsCreator from '../middlewares/errorCreator';
const router = Router();

/**
 * @swagger
 * '/api/v1/sample/{sample}':
 *  get:
 *   summary: 'サンプルAPI'
 *   description: 'APIのサンプル。JSONを返却する。'
 *   parameters:
 *   - in: path
 *     name: sample
 *     required: false
 *     description: サンプル
 *     schema:
 *       type: string
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

	router.get('/:sample', validator.sample, async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
    if (!errors.isEmpty()) {
			res.status(200);
			res.json(errorsCreator.createValidationErrors(errors.array()));
		}

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
