import { faker } from '@faker-js/faker';

/**
 * @param {*} min
 * @param {*} max
 * @returns {number}
 */
export const createBeverageStock = (min, max) => {
  return faker.number.int({ min, max });
};
