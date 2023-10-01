import { PAYMENT_STATUS } from '../../constants/payment.constant';

export class PaymentsService {
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
      throw new Error('PaymentsService.updateStatus 허용되지 않은 status');
    }

    this.#status = status;

    return this.getStatus();
  }
}
