import { Router } from 'express';
import { paramIdPipe } from '../../middleware/pipes/param-id.pipe.js';
import cardsCtrl from './cards.ctrl.js';

const router = Router();

router.get('/:id', paramIdPipe, cardsCtrl.getCardInfo);

export default router;
