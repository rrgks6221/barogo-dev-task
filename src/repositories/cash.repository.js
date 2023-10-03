export class CashRepository {
  static #cash = 0;

  static get() {
    return this.#cash;
  }

  /**
   * @param {number} amount
   */
  static increase(amount) {
    this.#cash += amount;

    return this.#cash;
  }

  /**
   * @param {number} amount
   */
  static decrease(amount) {
    if (amount > this.#cash) {
      throw new Error(
        `${this.name}.${this.decrease.name} 중 현재 금액보다 더 큰 금액 감소`
      );
    }

    this.#cash -= amount;

    return this.#cash;
  }

  /**
   * @returns {void}
   */
  static reset() {
    this.#cash = 0;
  }
}
