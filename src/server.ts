import app from './app';
import { env } from './config/env';

const port = Number(env.port) || 4009;

app.listen(port, '0.0.0.0', () => {
  console.log(`🍳 Chef Service cooking on port ${port}`);
});
