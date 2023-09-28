import { BeverageService } from '../../services/beverages.service.js';

const beveragesCtrl = {};

beveragesCtrl.findAll = (_req, res) => {
  const beverageService = new BeverageService();
  const beverages = beverageService.findAll();

  return res.status(200).json(beverages);
};

beveragesCtrl.findOne = (req, res) => {
  const { params } = req;
  const { id } = params;

  const beverageService = new BeverageService();
  const beverage = beverageService.findOneByIdOrFail(+id);

  return res.status(200).json(beverage);
};

export default beveragesCtrl;
