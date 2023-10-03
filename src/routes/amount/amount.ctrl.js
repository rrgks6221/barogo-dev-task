import { AmountService } from '../../services/amount/amount.service.js';

const amountCtrl = {};

amountCtrl.getCurrentAmount = (_req, res) => {
  const amountService = new AmountService();

  const currentAmount = amountService.getCurrentAmount();

  return res.status(200).json({ currentAmount });
};

export default amountCtrl;
