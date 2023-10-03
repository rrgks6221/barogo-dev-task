import { CashService } from '../../services/cash/cash.service.js';

const cashCtrl = {};

cashCtrl.getCash = (_req, res) => {
  const cashService = new CashService();

  const cash = cashService.getCash();
  const returnAmount = cashService.returnCash(cash);

  return res.status(200).json({ returnAmount });
};

cashCtrl.append = (req, res) => {
  const { body } = req;
  const { cash } = body;

  const cashService = new CashService();
  const appendedCash = cashService.increase(cash);

  return res.status(201).json({ cash: appendedCash });
};

export default cashCtrl;
