import { isNil } from '../../../common/functions.js';
import { HTTP_STATUS } from '../../../constants/http-status.constant.js';
import { CustomException } from '../../../exceptions/custom.exception.js';

export const appendCashBodyPipe = (req, _res, next) => {
  const { body } = req;
  const { cash } = body;

  if (isNil(cash)) {
    throw new CustomException({
      status: HTTP_STATUS.BAD_REQUEST,
      msg: 'cash 필수값입니다.',
    });
  }

  if (!Number.isInteger(Number(cash))) {
    throw new CustomException({
      status: HTTP_STATUS.BAD_REQUEST,
      msg: 'cash 정수형이어야합니다.',
    });
  }

  next();
};
