import { Router, Request, Response, NextFunction } from 'express';
import { getSample } from '../../services/sampleService';
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

	router.get('/', (req: Request, res: Response, next: NextFunction) => {
		const result = getSample();
		
		return res.json(result).status(200);
	});
};
