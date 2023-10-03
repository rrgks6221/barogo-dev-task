import { mockReq, mockRes } from '../../../../test/mock/http.mock.js';
import ordersCtrl from './orders.ctrl.js';

jest.mock('../../../services/orders/orders.service.js');

describe('ordersCtrl', () => {
  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('beverage', () => {
    it('response 204', () => {
      ordersCtrl.beverage(mockReq, mockRes);

      expect(mockRes.status).toBeCalledWith(204);
      expect(mockRes.json).toBeCalledWith();
    });
  });
});
