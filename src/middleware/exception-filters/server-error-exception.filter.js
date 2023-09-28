import { HTTP_STATUS } from '../../constants/http-status.constant.js';

export const serverErrorExceptionFilter = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  console.error('server error exception');
  console.error(`router path is ${req.path}`);
  console.error(err.stack);

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ msg: '서버에러' });
};
