import { CashRepository } from '../../repositories/cash.repository.js';
import { PaymentsService } from '../payments/payments.service.js';
import { CashService } from './cash.service.js';

jest.mock('../payments/payments.service.js');
jest.mock('../../repositories/cash.repository.js');

describe('CashService', () => {
  const cashService = new CashService();

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('append', () => {
    it('카드 결제중인 경우', () => {
      PaymentsService.getStatus.mockReturnValue('card');

      expect(() => cashService.append(500)).toThrowError();
    });

    it('사용 불가능한 화폐 단위인 경우', () => {
      expect(() => cashService.append(1000000)).toThrowError();
    });

    /**
     * 이 경우는 재현이 불가능하기에 skip 한다.
     */
    it.skip('이용 가능한 현금이 아닌 경우(불량)', () => {
      expect(() => cashService.append('불가능한 화폐')).toThrowError();
    });

    it('현금 추가', () => {
      PaymentsService.getStatus.mockReturnValue('cash');

      const cash = 500;

      CashRepository.get.mockReturnValue(cash);

      expect(cashService.append(cash)).toBe(cash);
      expect(CashRepository.append).toBeCalledWith(cash);
    });
  });
});
