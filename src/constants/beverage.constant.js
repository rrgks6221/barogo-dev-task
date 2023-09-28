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
  [BEVERAGE.COKE]: createBeverageStock(INITIAL_BEVERAGE_STOCK.MIN),
  [BEVERAGE.WATER]: createBeverageStock(INITIAL_BEVERAGE_STOCK.MIN),
  [BEVERAGE.COFFEE]: createBeverageStock(INITIAL_BEVERAGE_STOCK.MIN),
};
