import { isNil } from '../../../common/functions.js';
import { HTTP_STATUS } from '../../../constants/http-status.constant.js';
import { CustomException } from '../../../exceptions/custom.exception.js';

export const appendCashBodyPipe = (req, _res, next) => {
  const { body } = req;
  const { cash } = body;

  if (isNil(cash)) {
    throw new CustomException({
      status: HTTP_STATUS.BAD_REQUEST,
      msg: 'cash는 필수값입니다.',
    });
  }

  if (typeof cash !== 'number') {
    throw new CustomException({
      status: HTTP_STATUS.BAD_REQUEST,
      msg: 'cash는 정수형이어야합니다.',
    });
  }

  if (!Number.isInteger(cash)) {
    throw new CustomException({
      status: HTTP_STATUS.BAD_REQUEST,
      msg: 'cash는 정수형이어야합니다.',
    });
  }

  next();
};
