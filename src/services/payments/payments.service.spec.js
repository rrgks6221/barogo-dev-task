import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { PaymentsService } from './payments.service.js';

describe('PaymentsService', () => {
  beforeEach(() => {
    PaymentsService.setStatus(PAYMENT_STATUS.PENDING);
  });

  describe('getStatus', () => {
    it('get 초기값은 pending 이다.', () => {
      expect(PaymentsService.getStatus()).toBe(PAYMENT_STATUS.PENDING);
    });
  });

  describe('setStatus', () => {
    it('허용된 status', () => {
      const newStatus = PAYMENT_STATUS.CARD;

      expect(PaymentsService.setStatus(newStatus)).toBe(newStatus);
    });

    it('허용되지않은 status', () => {
      const wrongStatus = 'wrongStatus';

      expect(() => PaymentsService.setStatus(wrongStatus)).toThrowError(Error);
    });
  });
});
