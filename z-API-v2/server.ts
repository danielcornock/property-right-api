import app from './app';
import * as config from '../utilities/config';

app.listen(config.port, () => {
  console.log(`[!] Server started on port ${config.port}`);
});
