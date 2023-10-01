import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { Beverage } from '../entities/beverage.entity.js';
import { CustomException } from '../exceptions/custom.exception.js';
import { BeverageRepository } from '../repositories/beverage.repository.js';

export class BeverageService {
  findAll() {
    return BeverageRepository.findAll();
  }

  /**
   *
   * @param {number} id
   * @returns {Beverage}
   */
  findOneByIdOrFail(id) {
    const beverage = BeverageRepository.findOneById(id);

    if (!beverage) {
      throw new CustomException({
        status: HTTP_STATUS.NOT_FOUND,
        msg: '존재하지 않는 음료입니다.',
      });
    }

    return beverage;
  }
}
