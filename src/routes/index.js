import express from 'express';
import beverages from './beverages/index.js';
import cards from './cards/index.js';
import cash from './cash/index.js';
import reset from './reset/index.js';

const router = express.Router();

router.use('/beverages', beverages);
router.use('/cards', cards);
router.use('/cash', cash);
router.use('/reset', reset);

export default router;
