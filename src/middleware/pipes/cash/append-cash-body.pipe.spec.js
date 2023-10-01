import { mockNext, mockReq, mockRes } from '../../../../test/mock/http.mock';
import { AVAILABLE_CASH } from '../../../constants/cash.constant';
import { CustomException } from '../../../exceptions/custom.exception';
import { appendCashBodyPipe } from './append-cash-body.pipe';

describe('appendCashBodyPipe', () => {
  const req = JSON.parse(JSON.stringify(mockReq));

  afterEach(() => {
    req.body.cash = undefined;
  });

  it('cash 가 undefined 인 경우', () => {
    req.body.cash = undefined;

    expect(() => appendCashBodyPipe(req, mockRes, mockNext)).toThrowError(
      CustomException
    );
  });

  it('cash 가 null 인 경우', () => {
    req.body.cash = null;

    expect(() => appendCashBodyPipe(req, mockRes, mockNext)).toThrowError(
      CustomException
    );
  });

  it('cash 가 정수형이 아닌 경우', () => {
    req.body.cash = 'cash';

    expect(() => appendCashBodyPipe(req, mockRes, mockNext)).toThrowError(
      CustomException
    );
  });

  it('cash 가 이용 불가능한 현금인 경우', () => {
    req.body.cash = 1;

    expect(() => appendCashBodyPipe(req, mockRes, mockNext)).toThrowError(
      CustomException
    );
  });

  it('cash 가 이용 가능한 현금인 경우', () => {
    req.body.cash = AVAILABLE_CASH[100];

    expect(() => appendCashBodyPipe(req, mockRes, mockNext)).toThrowError(
      CustomException
    );
  });
});
