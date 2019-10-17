import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import * as config from '../../utilities/config';

export class Middleware {
  constructor(private app: any) {
    this.globalSetup(this.app);
  }

  public globalSetup(app: any): void {
    app.use(express.json());

    app.use('/images', express.static(path.join(__dirname, '../images')));

    app.use(cors({ origin: config.clientPort }));

    if (config.env !== 'production') {
      app.use(morgan('dev'));
    }
  }
}
