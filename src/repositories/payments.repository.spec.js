import { PAYMENT_STATUS } from '../constants/payment.constant.js';
import { PaymentsRepository } from './payments.repository.js';

describe('PaymentsRepository', () => {
  beforeEach(() => {
    PaymentsRepository.setStatus(PAYMENT_STATUS.PENDING);
  });

  describe('getStatus', () => {
    it('get 초기값은 pending 이다.', () => {
      expect(PaymentsRepository.getStatus()).toBe(PAYMENT_STATUS.PENDING);
    });
  });

  describe('setStatus', () => {
    it('허용된 status', () => {
      const newStatus = PAYMENT_STATUS.CARD;

      expect(PaymentsRepository.setStatus(newStatus)).toBe(newStatus);
    });

    it('허용되지않은 status', () => {
      const wrongStatus = 'wrongStatus';

      expect(() => PaymentsRepository.setStatus(wrongStatus)).toThrowError(
        Error
      );
    });
  });
});
