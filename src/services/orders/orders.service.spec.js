import { CustomException } from '../../exceptions/custom.exception.js';
import { PaymentsRepository } from '../../repositories/payments.repository.js';
import { BeverageService } from '../beverages/beverages.service.js';
import { CardsService } from '../cards/cards.service.js';
import { CashService } from '../cash/cash.service.js';
import { OrdersService } from './orders.service.js';

jest.mock('../beverages/beverages.service.js');
jest.mock('../cash/cash.service.js');
jest.mock('../../repositories/payments.repository.js');
jest.mock('../cards/cards.service.js');

describe('OrdersService', () => {
  const ordersService = new OrdersService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('orderBeverage', () => {
    it('재고가 부족한 경우', () => {
      BeverageService.prototype.findOneByIdOrFail.mockReturnValue({
        stock: 0,
      });

      expect(() => ordersService.orderBeverage(1)).toThrowError(
        CustomException
      );
    });

    it('결제 대기 상태인 경우', () => {
      BeverageService.prototype.findOneByIdOrFail.mockReturnValue({
        stock: 1,
      });
      PaymentsRepository.getStatus.mockReturnValue('pending');

      expect(() => ordersService.orderBeverage(1)).toThrowError(
        CustomException
      );
    });

    describe('현금 결제인 경우', () => {
      const beveragePrice = 500;

      beforeEach(() => {
        BeverageService.prototype.findOneByIdOrFail.mockReturnValue({
          stock: 1,
          price: beveragePrice,
        });
        PaymentsRepository.getStatus.mockReturnValue('cash');
      });

      it('금액이 부족한 경우', () => {
        CashService.prototype.getCash.mockReturnValue(300);

        expect(() => ordersService.orderBeverage(1)).toThrowError(
          CustomException
        );
        expect(CashService.prototype.decrease).not.toBeCalled();
        expect(BeverageService.prototype.decreaseStockById).not.toBeCalled();
      });

      it('현금 결제 성공', () => {
        CashService.prototype.getCash.mockReturnValue(beveragePrice);

        expect(() => ordersService.orderBeverage(1)).not.toThrowError();
        expect(CashService.prototype.decrease).toBeCalledWith(beveragePrice);
        expect(BeverageService.prototype.decreaseStockById).toBeCalled();
      });
    });

    describe('카드 결제인 경우', () => {
      const beveragePrice = 500;

      beforeEach(() => {
        BeverageService.prototype.findOneByIdOrFail.mockReturnValue({
          stock: 1,
          price: beveragePrice,
        });
        PaymentsRepository.getStatus.mockReturnValue('card');
      });

      it('카드 결제', () => {
        expect(() => ordersService.orderBeverage(1)).not.toThrowError();
        expect(CardsService.prototype.payments).toBeCalledWith(500);
        expect(BeverageService.prototype.decreaseStockById).toBeCalled();
      });
    });
  });
});
