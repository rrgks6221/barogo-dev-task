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

  describe('append', () => {
    it('추가 후 추가된 금액을 반환한다.', () => {
      const appendCash = 300;

      expect(CashRepository.increase(appendCash)).toBe(appendCash);
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
