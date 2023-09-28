import { mockNext, mockReq, mockRes } from '../../../test/mock/http.mock';
import { HTTP_STATUS } from '../../constants/http-status.constant';
import { serverErrorExceptionFilter } from './server-error-exception.filter';

describe('server-error-exception.filter.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  it('err 가 없는 경우', () => {
    serverErrorExceptionFilter(null, mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });

  it('err 가 있는 경우', () => {
    serverErrorExceptionFilter(
      new Error('error msg'),
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockNext).not.toBeCalled();
    expect(mockRes.status).toBeCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toBeCalledWith({ msg: '서버에러' });
  });
});
