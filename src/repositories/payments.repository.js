import { PAYMENT_STATUS } from '../constants/payment.constant.js';

export class PaymentsRepository {
  static #status = PAYMENT_STATUS.PENDING;

  /**
   * @returns {'pending' | 'cash' | 'card'} status
   */
  static getStatus() {
    return this.#status;
  }

  /**
   * @param {'pending' | 'cash' | 'card'} status
   */
  static setStatus(status) {
    const upperStatus = status.toUpperCase();

    if (!PAYMENT_STATUS[upperStatus]) {
      throw new Error('PaymentsRepository.updateStatus 허용되지 않은 status');
    }

    this.#status = status;

    return this.getStatus();
  }
}
