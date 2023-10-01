import { createBeverageStock, isNil } from './functions.js';

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

  describe('isNil', () => {
    it('파라미터가 없는 경우', () => {
      expect(isNil()).toBe(true);
    });

    it('undefined 가 들어온 경우', () => {
      expect(isNil(undefined)).toBe(true);
    });

    it('null 이 들어온 경우', () => {
      expect(isNil(null)).toBe(true);
    });

    it('number type 이 들어온 경우', () => {
      expect(isNil(100)).toBe(false);
    });
  });
});
