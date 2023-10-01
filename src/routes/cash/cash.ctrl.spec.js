import { cashService } from '../../services/cash.service.js';

jest.mock('../../services/cash.service.js');

describe('cashCtrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});
