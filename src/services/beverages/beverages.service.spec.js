import { BEVERAGE_STOCK } from '../../constants/beverage.constant.js';
import { Beverage } from '../../entities/beverage.entity.js';
import { CustomException } from '../../exceptions/custom.exception.js';
import { BeverageRepository } from '../../repositories/beverage.repository.js';
import { BeverageService } from './beverages.service.js';

jest.mock('../../repositories/beverage.repository.js');

describe('beveragesService', () => {
  const beverageService = new BeverageService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    const beverages = [
      new Beverage({
        id: 1,
        name: 'coke',
        price: 1100,
        stock: BEVERAGE_STOCK.coke,
      }),
    ];

    beforeEach(() => {
      BeverageRepository.findAll.mockReturnValue(beverages);
    });

    it('findAll', () => {
      expect(beverageService.findAll()).toEqual(beverages);
    });
  });

  describe('findOne', () => {
    const beverage = new Beverage({
      id: 1,
      name: 'coke',
      price: 1100,
      stock: BEVERAGE_STOCK.coke,
    });

    it('음료가 존재하는 경우', () => {
      BeverageRepository.findOneById.mockReturnValue(beverage);

      expect(beverageService.findOneByIdOrFail(1)).toEqual(beverage);
    });

    it('음료가 존재하지 않는 경우', () => {
      BeverageRepository.findOneById.mockReturnValue(null);

      expect(() => beverageService.findOneByIdOrFail(-1)).toThrowError(
        CustomException
      );
    });
  });
});
