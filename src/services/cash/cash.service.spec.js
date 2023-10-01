import { CashService } from './cash.service.js';
  
describe('CashService', () => {
  const cashService = new CashService;

  afterEach(() => {
    jest.clearAllMocks();
  });
});
