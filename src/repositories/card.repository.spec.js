import { faker } from '@faker-js/faker';
import { CardRepository } from './card.repository.js';

describe('CardRepository', () => {
  beforeEach(() => {
    CardRepository.reset();
  });

  it('getNumber', () => {
    expect(CardRepository.getNumber()).toBeNull();

    const cardNumber = faker.finance.accountNumber();

    CardRepository.setNumber(cardNumber);

    expect(CardRepository.getNumber()).toBe(cardNumber);
  });

  it('setNumber', () => {
    const cardNumber = faker.finance.accountNumber();

    expect(CardRepository.setNumber(cardNumber)).toBe(cardNumber);
  });

  it('reset', () => {
    CardRepository.reset();

    expect(CardRepository.getNumber()).toBeNull();
  });
});
