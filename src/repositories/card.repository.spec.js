import { CardRepository } from './card.repository.js';

describe('CardRepository', () => {
  beforeEach(() => {
    CardRepository.reset();
  });

  describe('getCardNumber', () => {
    it('get', () => {
      expect(CardRepository.getCardNumber()).toBeNull();

      CardRepository.setCardNumber(123);

      expect(CardRepository.getCardNumber()).toBe(123);
    });
  });

  describe('setCardNumber', () => {
    it('set', () => {
      expect(CardRepository.setCardNumber(123)).toBe(123);
    });
  });

  describe('reset', () => {
    it('reset', () => {
      CardRepository.reset();

      expect(CardRepository.getCardNumber()).toBeNull();
    });
  });
});
