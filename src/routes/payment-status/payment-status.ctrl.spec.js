import { mockReq, mockRes } from '../../../test/mock/http.mock.js';
import { PaymentStatusService } from '../../services/payment-status/payment-status.service.js';
import paymentStatusCtrl from './payment-status.ctrl.js';

jest.mock('../../services/payment-status/payment-status.service.js');

describe('paymentStatusCtrl', () => {
  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStatus', () => {
    it('response 200', () => {
      PaymentStatusService.prototype.getStatus.mockReturnValue('pending');

      paymentStatusCtrl.getStatus(mockReq, mockRes);

      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ paymentStatus: 'pending' });
    });
  });
});
