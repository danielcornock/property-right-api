import { IUser } from './../../users/interfaces/IUser';
import { Request, Response, NextFunction, Express } from 'express';

export interface IRequest extends Request {
  user: IUser;
  file: Express.Multer.File;
}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}
