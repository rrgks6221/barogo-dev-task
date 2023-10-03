import { ResetService } from '../../services/reset/reset.service.js';

const resetCtrl = {};

resetCtrl.reset = (_req, res) => {
  const resetService = new ResetService();

  resetService.reset();

  return res.status(204).json();
};

export default resetCtrl;
