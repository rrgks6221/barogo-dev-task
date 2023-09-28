import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';

export const paramIdPipe = (req) => {
  const { params } = req;
  const { id } = params;

  if (isNaN(id)) {
    throw new CustomException({
      status: HTTP_STATUS.BAD_REQUEST,
      msg: `id는 정수형이어야합니다.`,
    });
  }

  if (Number(id) < 1) {
    throw new CustomException({
      status: HTTP_STATUS.BAD_REQUEST,
      msg: `id는 1 이상이어야합니다.`,
    });
  }

  req.params.id = Number(id);

  next();
};
