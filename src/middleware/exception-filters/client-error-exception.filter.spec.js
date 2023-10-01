import { mockNext, mockReq, mockRes } from '../../../test/mock/http.mock.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { clientErrorExceptionFilter } from './client-error-exception.filter.js';

describe('clientErrorExceptionFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  it('err 가 없는 경우', () => {
    clientErrorExceptionFilter(null, mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });

  it('err 가 CustomException 이 아닌 경우', () => {
    clientErrorExceptionFilter(new Error('msg'), mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });

  it('err 가 CustomException 인 경우', () => {
    clientErrorExceptionFilter(
      new CustomException({ status: 400, msg: 'msg' }),
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockNext).not.toBeCalled();
    expect(mockRes.status).toBeCalled();
    expect(mockRes.json).toBeCalled();
  });
});
