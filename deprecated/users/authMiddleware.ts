import { IRequest } from '../../utilities/interfaces/IMiddlewareParams';

export const setBodyUserId = (req: IRequest) => {
  return req.user._id;
};
