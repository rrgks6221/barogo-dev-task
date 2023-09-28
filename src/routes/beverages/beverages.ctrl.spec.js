import { mockReq, mockRes } from '../../../test/mock/http.mock';
import { BEVERAGE_STOCK } from '../../constants/beverage.constant';
import { Beverage } from '../../entities/beverage.entity.js';
import { BeverageService } from '../../services/beverages.service';
import beveragesCtrl from './beverages.ctrl.js';

jest.mock('../../services/beverages.service.js');

describe('beveragesCtrl', () => {
  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

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
      BeverageService.prototype.findAll.mockReturnValue(beverages);
    });

    it('response 200', () => {
      beveragesCtrl.findAll(mockReq, mockRes);

      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(beverages);
    });
  });

  describe('findOne', () => {
    const beverage = new Beverage({
      id: 1,
      name: 'coke',
      price: 1100,
      stock: BEVERAGE_STOCK.coke,
    });

    beforeEach(() => {
      BeverageService.prototype.findOneByIdOrFail.mockReturnValue(beverage);
    });

    it('response 200', () => {
      beveragesCtrl.findOne(mockReq, mockRes);

      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(beverage);
    });
  });
});
