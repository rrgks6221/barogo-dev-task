import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import { globalExceptionFilter } from './middleware/exception-filters/global-exception.filter.js';
import drinks from './routes/index.js';

config();

const app = express();

// request body parsing
app.use(json());

// urlencoded request body parsing
app.use(urlencoded({ extended: true }));

// routers
app.use('/api', drinks);

// exception filters
app.use(globalExceptionFilter);

export default app;
