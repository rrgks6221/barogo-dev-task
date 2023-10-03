import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { CardRepository } from '../../repositories/card.repository.js';
import { CashRepository } from '../../repositories/cash.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';

export class ResetService {
  reset() {
    CardRepository.reset();
    CashRepository.reset();
    PaymentsRepository.setStatus(PAYMENT_STATUS.PENDING);
  }
}
