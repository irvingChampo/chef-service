import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chefRoutes from './infrastructure/api/routes/chef.routes';

const app = express();

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    service: 'Chef-Service',
    status: 'Online'
  });
});

app.use('/api/v1/chef', chefRoutes);

export default app;