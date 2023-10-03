import { mockReq, mockRes } from '../../../test/mock/http.mock.js';
import { CardsService } from '../../services/cards/cards.service.js';
import cardsCtrl from './cards.ctrl.js';

jest.mock('../../services/cards/cards.service.js');

describe('cardsCtrl', () => {
  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCardInfo', () => {
    it('response 200', () => {
      const amount = 300;

      CardsService.prototype.getCardInfo.mockReturnValue({ amount });

      cardsCtrl.getCardInfo(mockReq, mockRes);

      expect(mockRes.json).toBeCalledWith({ amount });
      expect(mockRes.status).toBeCalledWith(200);
    });
  });
});
