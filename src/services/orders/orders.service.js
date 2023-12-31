import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BeverageService } from '../beverages/beverages.service.js';
import { CardsService } from '../cards/cards.service.js';
import { CashService } from '../cash/cash.service.js';

export class OrdersService {
  /**
   * @param {number} beverageId
   */
  orderBeverage(beverageId) {
    const beveragesService = new BeverageService();

    const beverage = beveragesService.findOneByIdOrFail(beverageId);

    if (beverage.stock === 0) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '재고가 부족합니다.',
      });
    }

    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus === PAYMENT_STATUS.PENDING) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '결제 대기 상태입니다.',
      });
    }

    if (paymentStatus === PAYMENT_STATUS.CASH) {
      const cashService = new CashService();

      const cash = cashService.getCash();

      if (cash < beverage.price) {
        throw new CustomException({
          status: HTTP_STATUS.BAD_REQUEST,
          msg: '금액이 부족합니다.',
        });
      }

      cashService.decrease(beverage.price);
    }

    if (paymentStatus === PAYMENT_STATUS.CARD) {
      const cardsService = new CardsService();

      cardsService.payments(beverage.price);
    }

    return beveragesService.decreaseStockById(beverageId);
  }
}
