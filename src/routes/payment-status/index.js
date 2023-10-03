import { Router } from 'express';
import paymentStatusCtrl from './payment-status.ctrl.js';

const router = Router();

/**
 * api/payment-status
 * 결제 상태를 반환합니다.
 * @returns {paymentStatus: 'card' | 'cash' | 'pending'}
 */
router.get('/', paymentStatusCtrl.getStatus);

export default router;
