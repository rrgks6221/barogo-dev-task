import { mockReq, mockRes } from '../../../test/mock/http.mock.js';
import { AmountService } from '../../services/amount/amount.service.js';
import amountCtrl from './amount.ctrl.js';

jest.mock('../../services/amount/amount.service.js');

describe('amountCtrl', () => {
  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentAmount', () => {
    it('response 200', () => {
      AmountService.prototype.getCurrentAmount.mockReturnValue(1000);

      amountCtrl.getCurrentAmount(mockReq, mockRes);

      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ currentAmount: 1000 });
    });
  });
});
