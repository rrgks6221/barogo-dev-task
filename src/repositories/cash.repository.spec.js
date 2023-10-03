import { CashRepository } from './cash.repository';

describe('cashRepository', () => {
  beforeEach(() => {
    CashRepository.reset();
  });

  describe('get', () => {
    it('조회 초기값은 0이다.', () => {
      expect(CashRepository.get()).toBe(0);
    });
  });

  describe('increase', () => {
    it('추가 후 추가된 금액을 반환한다.', () => {
      const cash = 300;

      expect(CashRepository.increase(cash)).toBe(cash);
    });
  });

  describe('decrease', () => {
    it('현재 금액보다 큰 금액은 에러를 던진다.', () => {
      expect(() => CashRepository.decrease(100)).toThrowError(Error);
    });

    it('감소 후 감소된 금액을 반환한다..', () => {
      CashRepository.increase(500);

      expect(CashRepository.decrease(300)).toBe(200);
    });
  });

  describe('reset', () => {
    it('reset', () => {
      CashRepository.increase(300);

      expect(CashRepository.get()).toBe(300);

      CashRepository.reset();

      expect(CashRepository.get()).toBe(0);
    });
  });
});
