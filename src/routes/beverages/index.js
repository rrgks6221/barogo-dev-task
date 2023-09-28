import { Router } from 'express';
import { paramIdPipe } from '../../middleware/pipes/param-id.pipe.js';
import beverageCtrl from './beverages.ctrl.js';

const router = Router();

router.get('', beverageCtrl.findAll);
router.get('/:id', paramIdPipe, beverageCtrl.findOne);

export default router;
