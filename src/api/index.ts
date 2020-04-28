import { Router } from 'express';
import sample from './routes/sample';
import trace from './routes/trace';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	sample(app);
	trace(app);

	return app;
}