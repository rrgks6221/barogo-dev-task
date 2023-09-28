import { CustomException } from '../../exceptions/custom.exception.js';

export const clientErrorExceptionFilter = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (!(err instanceof CustomException)) {
    return next();
  }

  console.warn('client error exception');
  console.warn(`router path is ${req.path}`);
  console.warn({ ...err });

  const { status, msg } = err;

  return res.status(status).json({ msg });
};
