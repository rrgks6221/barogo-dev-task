export class CardRepository {
  static #cardNumber = null;

  static getCardNumber() {
    return this.#cardNumber;
  }

  static setCardNumber(cardNumber) {
    this.#cardNumber = cardNumber;

    return this.getCardNumber();
  }

  static reset() {
    this.#cardNumber = null;
  }
}
