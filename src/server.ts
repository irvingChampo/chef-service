import app from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`👨‍🍳 Chef Service cooking on port ${env.port}`);
});