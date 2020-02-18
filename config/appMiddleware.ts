import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import * as config from './config';

export class Middleware {
  constructor(app: express.Application) {
    this.globalSetup(app);
  }

  public globalSetup(app: any): void {
    app.use(express.json());

    app.use('/images', express.static(path.join(__dirname, '../../images')));

    app.use(cors({ origin: [config.clientPort, 'https://property-right-ui.herokuapp.com/'] }));

    if (config.env !== 'production') {
      app.use(morgan('dev'));
    }
  }
}
