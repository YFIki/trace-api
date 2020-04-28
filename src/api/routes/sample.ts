import { Router, Request, Response, NextFunction } from 'express';
import { getSample } from '../../services/sampleService';
const router = Router();

export default (app: Router) => {
    app.use('/v1/sample', router);

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
        const result = getSample();
        
        return res.json(result).status(200);
    });
  };
