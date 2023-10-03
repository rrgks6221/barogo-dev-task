import { OrdersService } from './orders.service.js';
  
describe('OrdersService', () => {
  const ordersService = new OrdersService;

  afterEach(() => {
    jest.clearAllMocks();
  });
});
