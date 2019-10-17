import { IUser } from './utilities/interfaces/IUser';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
