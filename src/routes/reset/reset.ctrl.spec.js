import { mockReq, mockRes } from '../../../test/mock/http.mock';
import resetCtrl from './reset.ctrl.js';

jest.mock('../../services/reset/reset.service');

describe('resetCtrl', () => {
  beforeEach(() => {
    jest.spyOn(mockRes, 'status');
    jest.spyOn(mockRes, 'json');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('reset', () => {
    it('response 204', () => {
      resetCtrl.reset(mockReq, mockRes);

      expect(mockRes.status).toBeCalledWith(204);
      expect(mockRes.json).toBeCalled();
    });
  });
});
