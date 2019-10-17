import { Router } from 'express';
import { PropertyRoutes } from '../property/propertyRoutes';
import PropertyController from '../../collections/Property/propertyController';

export abstract class AbstractRoutes {
  public router: Router;
  protected abstract _assignRoutes(): void;

  constructor() {
    this.router = Router();
  }
}

export interface AbstractRoutes {
  _useExternalRoutes?(): void;
}
