import {
  IResponse,
  IRequest,
  INext
} from '../utilities/interfaces/IMiddlewareParams';

export const catchAsync = (fn: Function) => {
  return (req: IRequest, res: IResponse, next: INext) => {
    fn(req, res, next).catch(next);
  };
};
