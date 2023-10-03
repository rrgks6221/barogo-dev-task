import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BankService } from '../bank/bank.service.js';
import { CashService } from '../cash/cash.service.js';

export class AmountService {
  getCurrentAmount() {
    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus === PAYMENT_STATUS.CARD) {
      return BankService.cognize().amount;
    }
    if (paymentStatus === PAYMENT_STATUS.CASH) {
      const cashService = new CashService();

      return cashService.getCash();
    }
    return 0;
  }
}
