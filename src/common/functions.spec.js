import { createBeverageStock } from './functions.js';

describe('functions', () => {
  describe('createBeverageStock', () => {
    it('파라미터가 없는 경우', () => {
      const beverage = createBeverageStock();

      expect(typeof beverage).toBe('number');
    });

    it('파라미터가 있는 경우', () => {
      const min = 10;
      const max = 100;
      const beverage = createBeverageStock(min, max);

      expect(typeof beverage).toBe('number');
      expect(beverage).toBeGreaterThanOrEqual(min);
      expect(beverage).toBeLessThanOrEqual(max);
    });
  });
});
