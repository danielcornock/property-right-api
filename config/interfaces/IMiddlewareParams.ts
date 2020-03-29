import { IUser } from '../../collections/User/interfaces/IUser';
import { Request, Response, NextFunction } from 'express';

export interface IRequest<T extends IUser = IUser> extends Request {
  user: T;
}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}
