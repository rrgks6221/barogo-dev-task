import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { CardRepository } from '../../repositories/card.repository.js';
import { CashRepository } from '../../repositories/cash.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BankService } from '../bank/bank.service.js';

export class ResetService {
  reset() {
    CardRepository.reset();
    CashRepository.reset();
    PaymentsRepository.setStatus(PAYMENT_STATUS.PENDING);
    BankService.reset();
  }
}
