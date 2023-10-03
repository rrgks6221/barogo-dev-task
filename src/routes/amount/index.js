import { Router } from 'express';
import amountCtrl from './amount.ctrl.js';

const router = Router();

router.get('/', amountCtrl.getCurrentAmount);

export default router;
