import { Router, Request, Response, NextFunction } from 'express';
import { getTraceList } from '../../services/traceService';
const router = Router();

export default (app: Router) => {
    app.use('/v1/trace', router);

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
        const result = getTraceList();
        
        return res.json(result).status(200);
    });
  };
