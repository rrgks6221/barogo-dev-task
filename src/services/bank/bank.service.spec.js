import { faker } from '@faker-js/faker';
import { BankService } from './bank.service.js';

describe('BankService', () => {
  let bankService;

  beforeEach(() => {
    bankService = new BankService(faker.finance.accountNumber());
  });

  describe('cognize', () => {
    /**
     * 해당 테스트는 재현이 불가능하다.
     */
    it.skip('사용 불가 카드일 경우', () => {
      expect(() => bankService.cognize()).toThrowError();
    });

    it('카드 인식', () => {
      const cardInfo = bankService.cognize();
      const { amount } = cardInfo;

      expect(amount).toBeGreaterThanOrEqual(300);
      expect(amount).toBeLessThanOrEqual(3000);
    });
  });
});
