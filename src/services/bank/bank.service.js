import { randomNumber } from '../../common/functions.js';
import { CARD_BALANCE } from '../../constants/bank.constant.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { CustomException } from '../../exceptions/custom.exception.js';

/**
 * third party library 대용
 * 카드에 대한 처리를 임의적으로 한다.
 */
export class BankService {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  cognize() {
    const isAvailableCard = this.#validateCard();

    if (!isAvailableCard) {
      throw new CustomException({
        status: HTTP_STATUS.BAD_REQUEST,
        msg: '사용할 수 없는 카드입니다.',
      });
    }

    return {
      amount: randomNumber(CARD_BALANCE.MIN, CARD_BALANCE.MAX),
    };
  }

  #validateCard() {
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
