import { Router } from 'express';
import { appendCashBodyPipe } from '../../middleware/pipes/cash/append-cash-body.pipe.js';
import cashCtrl from './cash.ctrl.js';

const router = Router();

/**
 * api/cash
 * 거스름돈을 반환한 후 잔여금액 및 결제상태를 초기화합니다.
 * @returns {status: 200, body: {returnAmount: {100: number, 500: number, 1000: number, 5000: number, 10000: number}}}
 */
router.get('/', cashCtrl.getCash);
/**
 * api/cash
 * 현재 잔액에 투입된 금액을 더합니다.
 * @returns {status: 201, body: {cash: number}}
 */
router.post('/', appendCashBodyPipe, cashCtrl.append);

export default router;
