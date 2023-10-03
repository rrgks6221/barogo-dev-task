import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BankService } from '../bank/bank.service.js';
import { CashService } from '../cash/cash.service.js';
import { AmountService } from './amount.service.js';

jest.mock('../../repositories/payments.repository.js');
jest.mock('../bank/bank.service.js');
jest.mock('../cash/cash.service.js');

describe('AmountService', () => {
  const amountService = new AmountService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentAmount', () => {
    it('카드 결제상태인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('card');
      BankService.cognize.mockReturnValue({ amount: 1000 });

      expect(amountService.getCurrentAmount()).toBe(1000);
    });

    it('현금 결제상태인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('cash');
      CashService.prototype.getCash.mockReturnValue(1000);

      expect(amountService.getCurrentAmount()).toBe(1000);
    });

    it('결제상태가 대기인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('pending');

      expect(amountService.getCurrentAmount()).toBe(0);
    });
  });
});
