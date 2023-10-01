import { CashService } from '../../services/cash/cash.service.js';

const cashCtrl = {};

cashCtrl.append = (req, res) => {
  const { body } = req;
  const { cash } = body;

  const cashService = new CashService();
  const appendedCash = cashService.append(cash);

  return res.status(201).json({ cash: appendedCash });
};

export default cashCtrl;
