import { Router } from 'express';

export abstract class BaseRoutes {
  protected router: Router;
  protected abstract _assignRoutes(): void;

  constructor() {
    this.router = Router({ mergeParams: true });
  }

  public get routes() {
    return this.router;
  }
}
