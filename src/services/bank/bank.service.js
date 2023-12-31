import { isNil, randomNumber } from '../../common/functions.js';
import { CARD_BALANCE } from '../../constants/bank.constant.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';

/**
 * third party library 대용
 * 카드에 대한 처리를 임의적으로 한다.
 */
export class BankService {
  static #amount = null;

  static cognize() {
    const isAvailableCard = this.#validateCard();

    if (!isAvailableCard) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '사용할 수 없는 카드입니다.',
      });
    }

    return {
      amount: this.#getAmount(),
    };
  }

  static payments(paymentAmount) {
    const cardInfo = this.cognize();

    if (paymentAmount > cardInfo.amount) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '금액이 부족합니다.',
      });
    }

    this.#amount -= paymentAmount;

    return this.cognize();
  }

  static reset() {
    this.#amount = null;
  }

  /**
   * @returns {number}
   */
  static #getAmount() {
    if (isNil(this.#amount)) {
      this.#setAmount();
    }

    return this.#amount;
  }

  static #setAmount() {
    this.#amount = randomNumber(CARD_BALANCE.MIN, CARD_BALANCE.MAX);
  }

  static #validateCard() {
    // 불량 여부
    // 항상 불량이 아니라고 가정한다.
    const isBad = false;

    if (isBad) {
      return false;
    }

    // 정지 여부
    // 항상 정지가 아니라고 가정한다.
    const isStop = false;

    if (isStop) {
      return false;
    }

    // 분실 여부
    // 항상 분실이 아니라고 가정한다.
    const isLost = false;

    if (isLost) {
      return false;
    }

    return true;
  }
}
