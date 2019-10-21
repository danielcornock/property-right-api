import { IUser } from '../../collections/User/interfaces/IUser';
import { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request {
  user: IUser;
}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}
