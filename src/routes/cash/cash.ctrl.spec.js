import { mockReq, mockRes } from '../../../test/mock/http.mock.js';
import { CashService } from '../../services/cash/cash.service.js';
import cashCtrl from './cash.ctrl.js';

jest.mock('../../services/cash/cash.service.js');

describe('cashCtrl', () => {
  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('append', () => {
    it('response 201', () => {
      CashService.prototype.increase.mockReturnValue(300);

      cashCtrl.append(mockReq, mockRes);

      expect(mockRes.json).toBeCalledWith({ cash: 300 });
      expect(mockRes.status).toBeCalledWith(201);
    });
  });

  describe('getCash', () => {
    it('response 200', () => {
      const returnAmount = {
        100: 0,
        500: 1,
        1000: 0,
        5000: 0,
        10000: 0,
      };
      CashService.prototype.getCash.mockReturnValue(500);
      CashService.prototype.returnCash.mockReturnValue(returnAmount);

      cashCtrl.getCash(mockReq, mockRes);

      expect(mockRes.json).toBeCalledWith({ returnAmount });
      expect(mockRes.status).toBeCalledWith(200);
    });
  });
});
