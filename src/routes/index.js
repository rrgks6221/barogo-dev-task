import express from 'express';
import beverages from './beverages/index.js';

const router = express.Router();

router.use('/beverages', beverages);

export default router;
