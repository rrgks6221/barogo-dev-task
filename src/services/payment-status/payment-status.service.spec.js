import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { PaymentStatusService } from './payment-status.service.js';

jest.mock('../../repositories/payments.repository.js');

describe('PaymentStatusService', () => {
  const paymentStatusService = new PaymentStatusService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStatus', () => {
    it('getStatus', () => {
      PaymentsRepository.getStatus.mockReturnValue('cash');

      expect(paymentStatusService.getStatus()).toBe('cash');
    });
  });
});
