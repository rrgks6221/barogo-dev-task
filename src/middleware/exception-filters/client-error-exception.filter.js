import { CustomError } from '../../exceptions/not-found.exception.js';

export const clientErrorExceptionFilter = (err, req, res, next) => {
  console.log('-------------');
  console.log(err);
  if (!err) {
    return next();
  }

  if (!(err instanceof CustomError)) {
    return next();
  }

  console.warn('client error exception');
  console.warn(`router path is ${req.path}`);
  console.warn({ ...err });

  const { status, msg } = err;

  return res.status(status).json({ msg });
};