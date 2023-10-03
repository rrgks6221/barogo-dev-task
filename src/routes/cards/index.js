import { Router } from 'express';
import { paramIdPipe } from '../../middleware/pipes/param-id.pipe.js';
import cardsCtrl from './cards.ctrl.js';

const router = Router();

/**
 * api/cards/:id
 * 카드 정보를 조회합니다. (카드 금액)
 * @returns {status: 200, body: {amount: number}}
 */
router.get('/:id', paramIdPipe, cardsCtrl.getCardInfo);

export default router;
