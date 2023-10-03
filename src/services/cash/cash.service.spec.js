import { CashRepository } from '../../repositories/cash.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { CashService } from './cash.service.js';

jest.mock('../../repositories/payments.repository.js');
jest.mock('../../repositories/cash.repository.js');

describe('CashService', () => {
  const cashService = new CashService();

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('increase', () => {
    it('카드 결제중인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('card');

      expect(() => cashService.increase(500)).toThrowError();
    });

    it('사용 불가능한 화폐 단위인 경우', () => {
      expect(() => cashService.increase(1000000)).toThrowError();
    });

    /**
     * 이 경우는 재현이 불가능하기에 skip 한다.
     */
    it.skip('이용 가능한 현금이 아닌 경우(불량)', () => {
      expect(() => cashService.increase('불가능한 화폐')).toThrowError();
    });

    it('현금 추가', () => {
      PaymentsRepository.getStatus.mockReturnValue('cash');

      const cash = 500;

      CashRepository.get.mockReturnValue(cash);

      expect(cashService.increase(cash)).toBe(cash);
      expect(CashRepository.increase).toBeCalledWith(cash);
    });
  });

  describe('decrease', () => {
    it('카드 결제중인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('card');

      expect(() => cashService.getCash()).toThrowError();
    });

    it('현금 감소', () => {
      PaymentsRepository.getStatus.mockReturnValue('cash');

      expect(() => cashService.decrease(300)).not.toThrowError();
    });
  });

  describe('getCash', () => {
    it('카드 결제중인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('card');

      expect(() => cashService.getCash()).toThrowError();
    });

    it('현금 결제중인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('cash');

      expect(cashService.getCash()).toBeDefined();
    });
  });

  describe('returnCash', () => {
    beforeEach(() => {
      PaymentsRepository.getStatus.mockReturnValue('cash');
    });

    it('0원', () => {
      CashRepository.get.mockReturnValue(0);

      expect(cashService.returnCash()).toEqual({
        100: 0,
        500: 0,
        1000: 0,
        5000: 0,
        10000: 0,
      });
    });

    it('100원', () => {
      CashRepository.get.mockReturnValue(100);

      expect(cashService.returnCash()).toEqual({
        100: 1,
        500: 0,
        1000: 0,
        5000: 0,
        10000: 0,
      });
    });

    it('500원', () => {
      CashRepository.get.mockReturnValue(500);

      expect(cashService.returnCash()).toEqual({
        100: 0,
        500: 1,
        1000: 0,
        5000: 0,
        10000: 0,
      });
    });

    it('1600원', () => {
      CashRepository.get.mockReturnValue(1600);

      expect(cashService.returnCash()).toEqual({
        100: 1,
        500: 1,
        1000: 1,
        5000: 0,
        10000: 0,
      });
    });

    it('10000원', () => {
      CashRepository.get.mockReturnValue(10000);

      expect(cashService.returnCash()).toEqual({
        100: 0,
        500: 0,
        1000: 0,
        5000: 0,
        10000: 1,
      });
    });

    it('10100원', () => {
      CashRepository.get.mockReturnValue(10100);

      expect(cashService.returnCash()).toEqual({
        100: 1,
        500: 0,
        1000: 0,
        5000: 0,
        10000: 1,
      });
    });

    it('16600원', () => {
      CashRepository.get.mockReturnValue(16600);

      expect(cashService.returnCash()).toEqual({
        100: 1,
        500: 1,
        1000: 1,
        5000: 1,
        10000: 1,
      });
    });

    /**
     * 발생하면 안되는 경우지만 테스팅을 위해 작성
     */
    it('1원', () => {
      CashRepository.get.mockReturnValue(1);

      expect(cashService.returnCash()).toEqual({
        100: 0,
        500: 0,
        1000: 0,
        5000: 0,
        10000: 0,
      });
    });
  });
});
