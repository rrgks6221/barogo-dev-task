import { Router } from 'express';
import amountCtrl from './amount.ctrl.js';

const router = Router();

/**
 * /api/amount
 * 잔여금액을 조회합니다.
 * @returns {{status: 200, body: currentAmount:number}}
 */
router.get('/', amountCtrl.getCurrentAmount);

export default router;
