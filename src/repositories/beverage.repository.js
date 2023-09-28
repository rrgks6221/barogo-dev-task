import { Beverage } from '../entities/beverage.entity.js';

export class BeverageRepository {
  /**
   * @type {Beverage[]}
   */
  #beverages = [
    {
      id: 1,
      name: 'coke',
      fee: 1100,
    },
    {
      id: 2,
      name: 'water',
      fee: 1100,
    },
    {
      id: 3,
      name: 'coffee',
      fee: 1100,
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
