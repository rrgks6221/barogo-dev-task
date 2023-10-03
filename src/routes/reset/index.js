import { Router } from 'express';
import resetCtrl from './reset.ctrl.js';

const router = Router();

/**
 * api/reset
 * 서버 상태를 리셋합니다.
 * 카드 정보, 현금 정보, 결제상태
 * @returns {status: 204}
 */
router.post('/', resetCtrl.reset);

export default router;
