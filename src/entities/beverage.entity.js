export class Beverage {
  /**
   * @requires
   * @type {number}
   */
  id;

  /**
   * @requires
   * @type {string}
   */
  name;

  /**
   * @requires
   * @type {number}
   */
  stock;

  /**
   * @requires
   * @type {number}
   */
  price;

  /**
   * @requires
   * @param {Beverage} beverage
   */
  constructor(beverage) {
    Object.assign(this, beverage);
  }
}
