import { BaseRoutes } from './baseRoutes';
import authMiddleware from '../../collections/User/authMiddleware';

export abstract class GuardedRoutes extends BaseRoutes {
  constructor() {
    super();
    this.router.use(authMiddleware.authGuard);
  }
}
