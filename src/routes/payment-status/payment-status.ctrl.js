import { PaymentStatusService } from '../../services/payment-status/payment-status.service.js';

const paymentStatusCtrl = {};

paymentStatusCtrl.getStatus = (_req, res) => {
  const paymentStatusService = new PaymentStatusService();

  const paymentStatus = paymentStatusService.getStatus();

  return res.status(200).json({ paymentStatus });
};

export default paymentStatusCtrl;
