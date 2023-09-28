import { BEVERAGE_STOCK } from '../constants/beverage.constant.js';
import { Beverage } from '../entities/beverage.entity.js';

export class BeverageRepository {
  /**
   * @type {Beverage[]}
   */
  #beverages = [
    {
      id: 1,
      name: 'coke',
      price: 1100,
      stock: BEVERAGE_STOCK.coke,
    },
    {
      id: 2,
      name: 'water',
      price: 600,
      stock: BEVERAGE_STOCK.water,
    },
    {
      id: 3,
      name: 'coffee',
      price: 700,
      stock: BEVERAGE_STOCK.coffee,
    },
  ];

  /**
   * @returns {Beverage[]}
   */
  findAll() {
    return this.#beverages.map((beverage) => new Beverage(beverage));
  }

  /**
   * @param {number} id
   * @returns {Beverage | null}
   */
  findOneById(id) {
    const beverage = this.#beverages.find((beverage) => id === beverage.id);

    return beverage ? new Beverage(beverage) : null;
  }
}
