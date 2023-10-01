import { CashService } from '../../services/cash/cash.service.js';

const cashCtrl = {};

cashCtrl.append = (req, res) => {
  const { body } = req;
  const { amount } = body;
  console.log(amount);

  const cashService = new CashService();
  const cash = cashService.append(amount);

  return res.status(201).json({ cash });
};

export default cashCtrl;
