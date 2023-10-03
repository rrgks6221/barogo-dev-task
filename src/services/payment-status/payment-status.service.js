import { PaymentsRepository } from '../../repositories/payments.repository.js';

export class PaymentStatusService {
  getStatus() {
    return PaymentsRepository.getStatus();
  }
}
