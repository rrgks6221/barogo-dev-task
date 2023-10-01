import { CashRepository } from '../../repositories/cash.repository.js';
import { CashService } from './cash.service.js';

jest.mock('../../repositories/cash.repository.js');

describe('CashService', () => {
  const cashService = new CashService();

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('append', () => {
    it('현금 추가', () => {
      const cash = 300;

      CashRepository.get.mockReturnValue(cash);

      expect(cashService.append(cash)).toBe(cash);
      expect(CashRepository.append).toBeCalledWith(cash);
    });
  });
});
