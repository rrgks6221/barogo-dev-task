import { Beverage } from '../entities/beverage.entity.js';
import { CustomException } from '../exceptions/custom.exception.js';
import { BeverageRepository } from '../repositories/beverage.repository.js';

export class BeverageService {
  constructor() {
    this.repository = new BeverageRepository();
  }

  findAll() {
    return this.repository.findAll();
  }

  /**
   *
   * @param {number} id
   * @returns {Beverage}
   */
  findOneByIdOrFail(id) {
    const beverage = this.repository.findOneById(id);

    if (!beverage) {
      throw new CustomException({
        status: HTTP_STATUS.NOT_FOUND,
        msg: '존재하지 않는 음료',
      });
    }

    return beverage;
  }
}
