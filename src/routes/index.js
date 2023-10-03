import express from 'express';
import beverages from './beverages/index.js';
import cards from './cards/index.js';
import cash from './cash/index.js';
import paymentStatus from './payment-status/index.js';
import reset from './reset/index.js';
import amount from './amount/index.js';

const router = express.Router();

router.use('/beverages', beverages);
router.use('/cards', cards);
router.use('/cash', cash);
router.use('/payment-status', paymentStatus);
router.use('/reset', reset);
router.use('/amount', amount);

export default router;
