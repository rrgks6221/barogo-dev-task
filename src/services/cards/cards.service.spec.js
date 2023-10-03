import { faker } from '@faker-js/faker';
import { CardRepository } from '../../repositories/card.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { CardsService } from './cards.service.js';

jest.mock('../../repositories/card.repository.js');
jest.mock('../../repositories/payments.repository.js');

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

      const cardNumber = faker.finance.creditCardNumber();

      expect(cardsService.getCardInfo(cardNumber)).toMatchObject({
        amount: expect.anything(),
      });
      expect(PaymentsRepository.setStatus).toBeCalledWith('card');
      expect(CardRepository.setNumber).toBeCalledWith(cardNumber);
    });
  });
});
