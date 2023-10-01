import { faker } from '@faker-js/faker';

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const createBeverageStock = (min, max) => {
  return faker.number.int({ min, max });
};
