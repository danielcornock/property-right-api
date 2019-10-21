import app from './app';
import * as config from './config/config';

app.listen(config.port, () => {
  console.log(`[!] Server started on port ${config.port}`);
});
