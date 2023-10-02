import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';

export const globalExceptionFilter = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  try {
    if (err instanceof CustomException) {
      console.warn('client error exception');
      console.warn(`router path is ${req.path}`);
      console.warn({ ...err });

      const { status, msg, data = {} } = err;

      return res.status(status).json({ msg, data });
    }

    console.error('server error exception');
    console.error(`router path is ${req.path}`);
    console.error(err.stack);

    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: '서버에러' });
  } catch (error) {
    console.error('globalExceptionFilter error');
    console.error(error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ msg: '서버에러' });
  }
};
