import { CardRepository } from '../../repositories/card.repository.js';
import { CashRepository } from '../../repositories/cash.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BankService } from '../bank/bank.service.js';
import { ResetService } from './reset.service.js';

jest.mock('../../repositories/card.repository.js');
jest.mock('../../repositories/cash.repository.js');
jest.mock('../../repositories/payments.repository.js');
jest.mock('../bank/bank.service.js');

describe('ResetService', () => {
  const resetService = new ResetService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('reset', () => {
    it('reset', () => {
      expect(() => resetService.reset()).not.toThrowError();

      expect(CardRepository.reset).toBeCalled();
      expect(CashRepository.reset).toBeCalled();
      expect(PaymentsRepository.setStatus).toBeCalledWith('pending');
      expect(BankService.reset).toBeCalled();
    });
  });
});
