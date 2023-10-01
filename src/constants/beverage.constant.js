import { createBeverageStock } from '../common/functions.js';

const INITIAL_BEVERAGE_STOCK = {
  MIN: 10,
  MAX: 100,
};

export const BEVERAGE = {
  COKE: 'coke',
  WATER: 'water',
  COFFEE: 'coffee',
};

export const BEVERAGE_FEE = {
  [BEVERAGE.COKE]: 1100,
  [BEVERAGE.WATER]: 600,
  [BEVERAGE.COFFEE]: 700,
};

export const BEVERAGE_STOCK = {
  coke: createBeverageStock(
    INITIAL_BEVERAGE_STOCK.MIN,
    INITIAL_BEVERAGE_STOCK.MAX
  ),
  water: createBeverageStock(
    INITIAL_BEVERAGE_STOCK.MIN,
    INITIAL_BEVERAGE_STOCK.MAX
  ),
  coffee: createBeverageStock(
    INITIAL_BEVERAGE_STOCK.MIN,
    INITIAL_BEVERAGE_STOCK.MAX
  ),
};
