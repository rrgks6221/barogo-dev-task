import { Router } from 'express';
import { appendCashBodyPipe } from '../../middleware/pipes/cash/append-cash-body.pipe.js';
import cashCtrl from './cash.ctrl.js';

const router = Router();

router.get('/', cashCtrl.getCash);
router.post('/', appendCashBodyPipe, cashCtrl.append);

export default router;
