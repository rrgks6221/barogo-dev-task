import { Router } from 'express';
import { paramIdPipe } from '../../middleware/pipes/param-id.pipe.js';
import beverageCtrl from './beverages.ctrl.js';
import ordersCtrl from './orders/orders.ctrl.js';

const router = Router();

/**
 * api/beverages
 * 모든 음료의 정보를 조회합니다.
 * @returns {status: 200, body: Beverage[]}
 */
router.get('/', beverageCtrl.findAll);
/**
 * api/beverages/:id
 * 음료 하나의 정보를 조회합니다.
 * @returns {status: 200, body: Beverage}
 */
router.get('/:id', paramIdPipe, beverageCtrl.findOne);

/**
 * api/beverages/:id/orders
 * 음료를 추출 및 결제합니다.
 * 결제 상태가 카드인지 현금인지는 서버에서 검사하여 처리합니다.
 * @returns {status: 204}
 */
router.post('/:id/orders', paramIdPipe, ordersCtrl.beverage);

export default router;
