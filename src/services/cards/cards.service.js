import { HTTP_STATUS } from '../../constants/http-status.constant';
import { PAYMENT_STATUS } from '../../constants/payment.constant';
import { CustomException } from '../../exceptions/custom.exception';
import { BankService } from '../bank/bank.service';
import { PaymentsService } from '../payments/payments.service';

export class CardsService {
  getCardInfo(cardNumber) {
    const paymentStatus = PaymentsService.getStatus();

    if (paymentStatus === PAYMENT_STATUS.CASH) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '현재 현금 결제중입니다.',
      });
    }

    const bankService = new BankService(cardNumber);
    PaymentsService.setStatus(PAYMENT_STATUS.CARD);

    return bankService.cognize();
  }
}
