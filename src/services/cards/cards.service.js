import { isNil } from '../../common/functions.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { CardRepository } from '../../repositories/card.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BankService } from '../bank/bank.service.js';

export class CardsService {
  /**
   * @param {number} cardNumber
   */
  getCardInfo(cardNumber) {
    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus === PAYMENT_STATUS.CASH) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '현재 현금 결제중입니다.',
      });
    }

    PaymentsRepository.setStatus(PAYMENT_STATUS.CARD);
    CardRepository.setCardNumber(cardNumber);

    return BankService.cognize(cardNumber);
  }

  /**
   * @param {number} paymentsAmount
   */
  payments(paymentsAmount) {
    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus !== PAYMENT_STATUS.CARD) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '현재 카드결제중이 아닙니다..',
      });
    }

    if (isNil(CardRepository.getCardNumber())) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '인식된 카드가 없습니다.',
      });
    }

    const cardInfo = BankService.payments(paymentsAmount);

    return cardInfo;
  }
}
