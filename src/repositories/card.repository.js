export class CardRepository {
  static #cardNumber = null;

  static getNumber() {
    return this.#cardNumber;
  }

  /**
   * @param {number} number
   */
  static setNumber(number) {
    this.#cardNumber = number;

    return this.getNumber();
  }

  static reset() {
    this.#cardNumber = null;
  }
}
