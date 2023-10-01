import { CashRepository } from '../../repositories/cash.repository.js';

export class CashService {
  /**
   * @param {number} cash
   */
  append(cash) {
    CashRepository.append(cash);

    return CashRepository.get();
  }
}
