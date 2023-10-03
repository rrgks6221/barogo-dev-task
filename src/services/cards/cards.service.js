import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { CardRepository } from '../../repositories/card.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BankService } from '../bank/bank.service.js';

export class CardsService {
  getCardInfo(cardNumber) {
    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus === PAYMENT_STATUS.CASH) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '현재 현금 결제중입니다.',
      });
    }

    PaymentsRepository.setStatus(PAYMENT_STATUS.CARD);
    CardRepository.setNumber(cardNumber);

    return BankService.cognize();
  }
}
