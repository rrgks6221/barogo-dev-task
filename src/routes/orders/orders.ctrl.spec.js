import { ordersService } from '../../services/orders.service.js';

jest.mock('../../services/orders.service.js');

describe('ordersCtrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});
