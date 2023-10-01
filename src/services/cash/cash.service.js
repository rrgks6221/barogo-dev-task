import { CashRepository } from '../../repositories/cash.repository.js';

export class CashService {
  /**
   * @param {number} amount
   */
  append(amount) {
    CashRepository.append(amount);

    return CashRepository.get();
  }
}
