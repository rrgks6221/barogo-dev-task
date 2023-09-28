import { Router } from 'express';
import beverageCtrl from './beverages.ctrl.js';

const router = Router();

router.get('', beverageCtrl.findAll);
router.get('/:id', beverageCtrl.findOne);

export default router;
