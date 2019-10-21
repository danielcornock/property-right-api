import { IUser } from '../../deprecated/users/interfaces/IUser';
import { Request, Response, NextFunction, Express } from 'express';

export interface IRequest extends Request {
  user: IUser;
}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}
