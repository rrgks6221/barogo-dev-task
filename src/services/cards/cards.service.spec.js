import { faker } from '@faker-js/faker';
import { CardRepository } from '../../repositories/card.repository.js';
import { PaymentsService } from '../payments/payments.service.js';
import { CardsService } from './cards.service.js';

jest.mock('../../repositories/card.repository.js');
jest.mock('../payments/payments.service.js');

describe('CardsService', () => {
  const cardsService = new CardsService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCardInfo', () => {
    it('현금 결제중인 경우', () => {
      PaymentsService.getStatus.mockReturnValue('cash');

      expect(() => cardsService.getCardInfo(45678)).toThrowError();
    });

    it('카드 조회', () => {
      PaymentsService.getStatus.mockReturnValue('card');

      const cardNumber = faker.finance.creditCardNumber();

      expect(cardsService.getCardInfo(cardNumber)).toMatchObject({
        amount: expect.anything(),
      });
      expect(PaymentsService.setStatus).toBeCalledWith('card');
      expect(CardRepository.setNumber).toBeCalledWith(cardNumber);
    });
  });
});
