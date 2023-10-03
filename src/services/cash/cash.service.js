import {
  AVAILABLE_CASH,
  AVAILABLE_CASH_DESC,
} from '../../constants/cash.constant.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { PAYMENT_STATUS } from '../../constants/payment.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { CashRepository } from '../../repositories/cash.repository.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';

export class CashService {
  /**
   * @param {number} cash
   */
  increase(cash) {
    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus === PAYMENT_STATUS.CARD) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '현재 카드결제중입니다.',
        data: {
          returnAmount: cash,
        },
      });
    }

    if (!this.#validateAvailableCash(cash)) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '사용 불가능한 화폐단위입니다.',
        data: {
          returnAmount: cash,
        },
      });
    }

    if (!this.#validateCash(cash)) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '이용가능한 현금이 아닙니다.',
        data: {
          returnAmount: cash,
        },
      });
    }

    PaymentsRepository.setStatus(PAYMENT_STATUS.CASH);
    CashRepository.increase(cash);

    return CashRepository.get();
  }

  /**
   * @param {*} cash
   * @returns
   */
  decrease(cash) {
    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus === PAYMENT_STATUS.CARD) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '현재 카드결제중입니다.',
        data: {
          returnAmount: cash,
        },
      });
    }

    PaymentsRepository.setStatus(PAYMENT_STATUS.CASH);
    CashRepository.decrease(cash);

    return CashRepository.get();
  }

  /**
   *
   * @returns {number}
   */
  getCash() {
    const paymentStatus = PaymentsRepository.getStatus();

    if (paymentStatus === PAYMENT_STATUS.CARD) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '현재 카드결제중입니다.',
      });
    }

    return CashRepository.get();
  }

  /**
   * @param {number} cash
   * @returns {object}
   */
  returnCash() {
    let remainingCash = this.getCash();

    const returnAmount = AVAILABLE_CASH_DESC.reduce((acc, cur) => {
      acc[cur] = Math.floor(remainingCash / cur);

      remainingCash %= cur;

      return acc;
    }, {});

    PaymentsRepository.setStatus(PAYMENT_STATUS.PENDING);
    CashRepository.reset();

    return returnAmount;
  }

  /**
   * 허용된 화폐단위인지 확인한다.
   * @param {number} cash
   * @returns {boolean}
   */
  #validateAvailableCash(cash) {
    return AVAILABLE_CASH[cash];
  }

  /**
   * 정상적인 화폐인지 확인한다.
   * 실제로는 순수 소프트웨어에서는 확인 불가능하지만 가능하다고 가정한다.
   * @param {number} _cash
   * @returns {boolean}
   */
  #validateCash(_cash) {
    // 위조 여부
    // 항상 위조되지 않았다고 가정한다.
    const isCounterfeit = false;

    if (isCounterfeit) {
      return false;
    }

    // 위조 여부
    // 항상 훼손되지 않았다고 가정한다.
    const isDamaged = false;

    if (isDamaged) {
      return false;
    }

    return true;
  }
}
