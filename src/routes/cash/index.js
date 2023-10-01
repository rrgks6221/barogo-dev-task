import { Router } from 'express';
import cashCtrl from './cash.ctrl.js';

const router = Router();

router.post('/', cashCtrl.append);

export default router;
