import { Router } from 'express';
import resetCtrl from './reset.ctrl.js';

const router = Router();

router.post('/', resetCtrl.reset);

export default router;
