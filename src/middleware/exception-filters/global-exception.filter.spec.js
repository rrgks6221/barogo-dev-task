import { mockNext, mockReq, mockRes } from '../../../test/mock/http.mock.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { globalExceptionFilter } from './global-exception.filter.js';

describe('globalExceptionFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  it('err 가 없는 경우', () => {
    globalExceptionFilter(null, mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });

  it('err 가 CustomException 인 경우', () => {
    globalExceptionFilter(
      new CustomException({ status: 400, msg: 'msg' }),
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockNext).not.toBeCalled();
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalled();
  });

  it('err 가 CustomException 이 아닌 경우', () => {
    globalExceptionFilter(new Error('msg'), mockReq, mockRes, mockNext);

    expect(mockNext).not.toBeCalled();
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalled();
  });
});
