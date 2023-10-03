import { faker } from '@faker-js/faker';
import { BankService } from './bank.service.js';

describe('BankService', () => {
  beforeEach(() => {
    BankService.reset();
  });

  describe('cognize', () => {
    /**
     * 해당 테스트는 재현이 불가능하다.
     */
    it.skip('사용 불가 카드일 경우', () => {
      expect(() => BankService.cognize()).toThrowError();
    });

    it('카드 인식', () => {
      const cardInfo = BankService.cognize();
      const { amount } = cardInfo;

      expect(amount).toBeGreaterThanOrEqual(300);
      expect(amount).toBeLessThanOrEqual(3000);
    });
  });

  describe('payments', () => {
    it('금액이 부족한 경우', () => {
      expect(() =>
        BankService.payments(5000, faker.finance.creditCardNumber())
      ).toThrowError();
    });

    it('결제 성공', () => {
      const oldAmount = BankService.cognize().amount;

      expect(() =>
        BankService.payments(200, faker.finance.creditCardNumber())
      ).not.toThrowError();

      const newAmount = BankService.cognize().amount;

      expect(oldAmount - 200).toBe(newAmount);
    });
  });
});
