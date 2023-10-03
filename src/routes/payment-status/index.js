import { Router } from 'express';
import paymentStatusCtrl from './payment-status.ctrl.js';

const router = Router();

router.get('/', paymentStatusCtrl.getStatus);

export default router;
