import { Router, Request, Response, NextFunction } from 'express';
import { getTraceList } from '../../services/traceService';
import { getToken } from '../middlewares/getToken';
import config from 'config';
const router = Router();

export default (app: Router) => {
	app.use('/v1/trace', router);

	router.get('/', (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = getTraceList();
			
			return res.json(result).status(200);
		} catch (err) {
			// 例外が発生した時の対応がわからないので、一旦console.logに出力するようにします。
			console.log(err);
		}
	});
};
