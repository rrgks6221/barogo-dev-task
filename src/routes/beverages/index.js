import { Router } from 'express';
import { paramIdPipe } from '../../middleware/pipes/param-id.pipe.js';
import beverageCtrl from './beverages.ctrl.js';
import ordersCtrl from './orders/orders.ctrl.js';

const router = Router();

router.get('/', beverageCtrl.findAll);
router.get('/:id', paramIdPipe, beverageCtrl.findOne);

router.post('/:id/orders', paramIdPipe, ordersCtrl.beverage);

export default router;
