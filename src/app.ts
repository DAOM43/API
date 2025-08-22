import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { setupSwagger } from './swagger';

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use('/api', routes);
app.use(errorMiddleware);
export default app;
