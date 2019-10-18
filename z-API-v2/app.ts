import express from 'express';
import mongoose from 'mongoose';
import { Middleware } from './config/appMiddleware';

import { Routes } from './routes';
import * as config from '../utilities/config';

class App {
  public app: express.Application;
  public routeConfig: Routes;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routeConfig = new Routes(this.app);
  }

  private config(): void {
    new Middleware(this.app);
  }

  private mongoSetup(): void {
    mongoose
      .connect(config.database(config.env), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log('[!] Connected to database.');
      })
      .catch(() => {
        console.error('[!][!] Error connecting to database.');
      });
  }
}

export default new App().app;
