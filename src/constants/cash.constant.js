export const AVAILABLE_CASH = {
  100: true,
  500: true,
  1000: true,
  5000: true,
  10000: true,
};

export const AVAILABLE_CASH_ASC = Object.keys(AVAILABLE_CASH)
  .sort((a, b) => a - b)
  .map((cash) => +cash);

export const AVAILABLE_CASH_DESC = Object.keys(AVAILABLE_CASH)
  .sort((a, b) => b - a)
  .map((cash) => +cash);
