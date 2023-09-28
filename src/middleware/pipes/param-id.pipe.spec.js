import { mockNext, mockReq, mockRes } from '../../../test/mock/http.mock.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { paramIdPipe } from './param-id.pipe.js';

describe('paramIdPipe', () => {
  const req = JSON.parse(JSON.stringify(mockReq));

  afterEach(() => {
    req.params.id = undefined;
  });

  it('id 가 string 형태인 경우', () => {
    req.params.id = 'string';

    expect(() => paramIdPipe(req, mockRes, mockNext)).toThrowError(
      CustomException
    );
  });

  it('id 가 float 형태인 경우', () => {
    req.params.id = '1.1';

    expect(() => paramIdPipe(req, mockRes, mockNext)).toThrowError(
      CustomException
    );
  });

  it('id 가 integer 형태인 경우', () => {
    req.params.id = '1';

    expect(paramIdPipe(req, mockRes, mockNext)).toBeUndefined();
    expect(mockNext).toBeCalled();
  });
});
