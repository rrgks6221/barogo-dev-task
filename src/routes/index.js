import express from 'express';
import beverages from './beverages/index.js';
import cash from './cash/index.js';
import orders from './orders/index.js';

const router = express.Router();

router.use('/beverages', beverages);
router.use('/cash', cash);
router.use('/orders', orders);

export default router;
