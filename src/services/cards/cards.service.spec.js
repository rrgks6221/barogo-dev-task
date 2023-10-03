import { faker } from '@faker-js/faker';
import { CardRepository } from '../../repositories/card.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BankService } from '../bank/bank.service.js';
import { CardsService } from './cards.service.js';

jest.mock('../../repositories/payments.repository.js');
jest.mock('../bank/bank.service.js');
jest.mock('../../repositories/card.repository.js');

describe('CardsService', () => {
  const cardsService = new CardsService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCardInfo', () => {
    it('현금 결제중인 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('cash');

      expect(() => cardsService.getCardInfo(45678)).toThrowError();
    });

    it('카드 조회', () => {
      PaymentsRepository.getStatus.mockReturnValue('card');
      BankService.cognize.mockReturnValue({ amount: 300 });

      const cardNumber = faker.finance.creditCardNumber();

      expect(cardsService.getCardInfo(cardNumber)).toMatchObject({
        amount: expect.anything(),
      });
      expect(PaymentsRepository.setStatus).toBeCalledWith('card');
    });
  });

  describe('payments', () => {
    const _cardNumber = faker.finance.accountNumber();

    it('카드 결제가 아닌 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('cash');

      expect(() => cardsService.payments(100, _cardNumber)).toThrowError();
    });

    it('인식된 카드가 없는 경우', () => {
      PaymentsRepository.getStatus.mockReturnValue('card');
      CardRepository.getCardNumber.mockReturnValue(null);

      expect(() => cardsService.payments(100, _cardNumber)).toThrowError();
    });

    it('카드 결제 성공', () => {
      PaymentsRepository.getStatus.mockReturnValue('card');
      CardRepository.getCardNumber.mockReturnValue(
        faker.finance.creditCardNumber()
      );
      BankService.payments.mockReturnValue({ amount: 100 });

      expect(cardsService.payments(300, _cardNumber)).toMatchObject({
        amount: expect.anything(),
      });
    });
  });
});
