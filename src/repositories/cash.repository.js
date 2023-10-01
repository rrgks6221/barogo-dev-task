export class CashRepository {
  static #cash = 0;

  static get() {
    return this.#cash;
  }

  /**
   * @param {number} amount
   */
  static append(amount) {
    this.#cash += amount;

    return this.#cash;
  }

  /**
   * @returns {void}
   */
  static reset() {
    this.#cash = 0;
  }
}
